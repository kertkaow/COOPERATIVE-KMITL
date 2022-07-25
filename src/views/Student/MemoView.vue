<template>
  <div v-if="loading">
    <LoadingComponent />
  </div>

  <div v-else class="row">
    <!-- Display Student Content -->
    <h1 class="mb-4 formtitle-1">ข้อมูลสหกิจ</h1>
    <div class="col-12">
      <table class="table table-hover">
        <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
          <tr>
            <th>รายละเอียด</th>
            <th>รหัสนักศึกษา</th>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>ชื่อบริษัท</th>
            <th>โครงการ</th>
            <th>อาจารย์ที่ปรึกษา</th>
            <th class="col col-2">กรรมการนิเทศสหกิจ</th>
            <th>สถานะปัจจุบัน</th>
            <th>Memo</th>
            <th>นัดสอบโปรเจค</th>
            <th>สถานะ</th>
            <th class="col col-1">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="Matching in MatchingsStudentID" :key="Matching.id">
            <td>
              <router-link :to="{ path: `/MatchingDetails/${Matching.id}` }" class="text-decoration-none btn btn-primary"
                style="color:white;width:8rem">
                ข้อมูลสหกิจ
              </router-link>
            </td>
            <td>{{ Matching.studentData.studentID }}</td>
            <td>{{ Matching.studentData.firstName }}</td>
            <td>{{ Matching.studentData.lastName }}</td>
            <td>{{ Matching.companyData.thaiName }}</td>
            <td>{{ Matching.companyData.projectName }}</td>
            <td>{{ Matching.companyData.projectTeacherMentor.userName }}</td>
            <td>{{ Matching.companyData.projectTeacherDirector.userName }}</td>
            <td>{{ Matching.cooperativeStatus.projectStatusNow }}</td>
            <td>
              <router-link :to="{ path: `/StudentWatchMemo/${Matching.id}` }"
                class="text-decoration-none btn btn-primary" style="color:white;">
                ดู Memo
              </router-link>
            </td>
            <td>{{ Matching.cooperativeStatus.projectExamdate }}</td>
            <td>{{ Matching.cooperativeStatus.projectStatus }}</td>
            <td>
              <router-link v-if="edit_status" :to="{ path: `/Editmemo/${Matching.id}` }"
                class="text-decoration-none btn edit-btn" style="color:white;width:8rem">
                นัดสอบโปรเจค
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
  import {
    matchingCollection,
    StatusCollection
  } from "@/firebase";
  import {
    getDocs,
    query,
    where,
    doc,
    getDoc
  } from "firebase/firestore";

  export default {
    components: {
      // ExportComponent,
      LoadingComponent
    },
    data() {
      return {
        loading: true,
        edit_status: null,
        MatchingsStudentID: [],
      }
    },
    methods: {
      async fetchMatching() {
        const userId = sessionStorage.getItem("userId")
        const getMatchingByStudentUserId = query(matchingCollection, where("studentData.userId", "==", userId));
        const matchingSnapShot = await getDocs(getMatchingByStudentUserId);
        let MatchingsStudentID = [];
        matchingSnapShot.forEach((matching) => {
          let matchingData = matching.data();
          matchingData.id = matching.id;
          MatchingsStudentID.push(matchingData);
        });
        this.MatchingsStudentID = MatchingsStudentID;
      },
      settimeOut() {
        setTimeout(() => {
          this.loading = false;
        }, "1000")
      },
      async getStatus() {
        let statusRef = doc(StatusCollection, 'Status');
        let status = await getDoc(statusRef);
        let statusData = status.data();
        sessionStorage.setItem("status", statusData.Status)
        this.edit_status = statusData.Status
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Student') {
          this.$toast.error("คุณไม่มีสิทธิ์เข้าถึง", {
            timeout: 2500,
            position: 'top-right',
          })
          this.$router.push("/")
        }
      }
    },
    created() {
      this.getStatus();
      this.settimeOut();
      this.fetchMatching();
      this.checkRole();
    },

  };
</script>


<style scoped>
  .btn {
    margin-right: 0;
    margin-left: 0;
    width: 7rem;
    justify-content: center;
    margin-left: 0;
    margin-right: 0;
    margin: 0.07rem;
    text-align: center;
    margin-bottom: 0.3rem;
  }

  .edit-btn {
    display: flex;
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    margin-bottom: 0.3rem;
    background: #FF6E30;
    border: 2px solid #FF6E30;
    color: white;
  }

  .edit-btn:hover {
    display: flex;
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    margin-bottom: 0.3rem;
    background: #e6571a;
    border: 2px solid #e6571a;
  }

  th,
  tr,
  td,
  th {
    text-align: center;
    width: 200rem;
    justify-content: center;
  }

  table {
    margin-left: 0;
    display: inline-block;
    justify-content: center;
    animation: fade 0.3s ease-in-out 0s;
    text-align: right;
  }

  tbody {
    margin-left: 0;
    justify-content: center;
  }

  #button {
    margin-right: 0.5px;

  }

  .addData-btn {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
    background: #FF6E30;
    border: 2px solid #FF6E30;
    color: white;
  }

  .addData-btn:hover {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
    background: #e6571a;
    border: 2px solid #e6571a;
  }

  .clm {
    border: 0.2rem solid #FF6E30;
    border-radius: 10px;
    color: white;
  }

  td {
    justify-content: center;
  }

  /* Animation */
  @keyframes slideIn {
    0% {
      transform: translateX(500px) scale(.2);
    }

    100% {
      transform: translateX(0px) scale(1);
    }
  }

  @keyframes slideUp {
    0% {
      transform: translateY(200px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  @keyframes expandRight {
    0% {
      transform: translateX(800px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  @keyframes expandLeft {
    0% {
      transform: translateX(-500px);
    }

    100% {
      transform: translateX(0px);
    }
  }

  .formtitle-1 {
    margin-bottom: 1rem;
    margin-top: -2vh;
    margin-left: 0;
    width: 300px;
    justify-content: center;
    text-align: center;
    background-color: #FF6E30;
    border: 0;
    border-radius: 15px;
    color: #fff;
    display: inline-block;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 18px;
    font-weight: 600;
    outline: 0;
    padding: 16px 21px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all .3s;
    user-select: none;
    animation: fade 0.3s ease-in-out 0s;

    -webkit-user-select: none;

  }

  .result-btn-wait {
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    background-color: #FF6E30;
    border: 0;
    border-radius: 5px;
    color: white;
    border: 2px solid #FF6E30;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 18px;
    font-weight: 300;
    outline: 0;
    position: relative;
    text-align: center;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
  }

  .result-btn-pass {
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    background-color: #4CAF50;
    border: 0;
    border-radius: 5px;
    color: white;
    border: px solid #4CAF50;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 20px;
    font-weight: 100;
    outline: 0;
    position: relative;
    text-align: center;
    transition: all .3s;
    user-select: none;
  }

  .result-btn-not-pass {
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    background-color: #f44336;
    border-radius: 5px;
    color: white;
    border: 2px solid #f44336;
    font-family: system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    font-size: 20px;
    font-weight: 100;
    outline: 0;
    text-align: center;
    transition: all .3s;
    user-select: none;
    -webkit-user-select: none;
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100;
    }

  }

  .filter-option {
    display: inline-flex;
    margin-left: 1vh;
    border-radius: 10px;
    width: 25vh;
    animation: fade 0.3s ease-in-out 0s;

  }

  .sidebar {
    margin-right: 92%;
    padding: 0;
    width: 180px;
    background-color: #f1f1f1;
    position: fixed;
    height: 19%;
    overflow: auto;
  }

  /* Sidebar links */
  .sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
  }

  /* Active/current link */
  .sidebar a.active {
    background-color: #FF6E30;
    color: white;
  }

  /* Links on mouse-over */
  .sidebar a:hover:not(.active) {
    background-color: rgb(85, 85, 85);
    color: white;
  }

  /* Page content. The value of the margin-left property should match the value of the sidebar's width property */
  div.content {
    margin-left: 200px;
    padding: 1px 16px;
    height: 1000px;
  }

  /* On screens that are less than 700px wide, make the sidebar into a topbar */
  @media screen and (max-width: 700px) {
    .sidebar {
      width: 100%;
      height: auto;
      position: relative;
    }

    .sidebar a {
      float: left;
    }

    div.content {
      margin-left: 0;
    }
  }

  /* On screens that are less than 400px, display the bar vertically, instead of horizontally */
  @media screen and (max-width: 400px) {
    .sidebar a {
      text-align: center;
      float: none;
    }
  }
</style>