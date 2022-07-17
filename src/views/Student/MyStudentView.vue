<template>
 <div v-if="loading">
    <LoadingComponent />
  </div>
  <div v-else class="row justify-content-center">
    <div class="col-11">
      <!-- Display Student Content -->
      <h1 class="mb-4 formtitle-1">ข้อมูลนักศึกษา</h1>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover">
            <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
              <tr>
                <th>รายละเอียด</th>
                <th>รหัสนักศึกษา</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>บริษัท - ตำแหน่ง (อันดับที่ 1)</th>
                <th>บริษัท - ตำแหน่ง (อันดับที่ 2)</th>
                <th>บริษัท - ตำแหน่ง (อันดับที่ 3)</th>
                <th class="col-1">จัดการข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in Students" :key="student.id">
                <td>
                  <router-link :to="{ path: `/StudentDetails/${student.id}` }"
                    class="btn btn-primary d-flex justify-content-center Info-btn">
                    ข้อมูลนักศึกษา
                  </router-link>
                </td>
                <td>{{ student.studentID }}</td>
                <td>{{ student.firstName }}</td>
                <td>{{ student.lastName }}</td>
                <td>
                  <router-link class="text-decoration-none" style="color: black;"
                    :to="{ path: `/CompanyDetails/${student.firstChoice.companyId}` }">
                    {{ student.firstChoice.companyNameAndProjectName }}</router-link>
                  <div v-if="student.firstChoice.result === 'true' " class="result-btn-pass">ผ่าน</div>
                  <div v-else-if="student.firstChoice.result === 'false' " class="result-btn-not-pass">ไม่ผ่าน</div>
                  <div v-else class="result-btn-wait">รอผลสัมภาษณ์</div>
                </td>
                <td>
                  <router-link class="text-decoration-none" style="color: black;"
                    :to="{ path: `/CompanyDetails/${student.secondChoice.companyId}` }">
                    {{ student.secondChoice.companyNameAndProjectName }}</router-link>
                  <div v-if="student.secondChoice.result == 'true' " class="result-btn-pass">ผ่าน</div>
                  <div v-else-if="student.secondChoice.result == 'false' " class="result-btn-not-pass">ไม่ผ่าน</div>
                  <div v-else class="result-btn-wait">รอผลสัมภาษณ์</div>
                </td>
                <td>
                  <router-link class="text-decoration-none" style="color: black;"
                    :to="{ path: `/CompanyDetails/${student.thirdChoice.companyId}` }">
                    {{ student.thirdChoice.companyNameAndProjectName }}</router-link>
                  <div v-if="student.thirdChoice.result === 'true' " class="result-btn-pass">ผ่าน</div>
                  <div v-else-if="student.thirdChoice.result === 'false' " class="result-btn-not-pass">ไม่ผ่าน</div>
                  <div v-else class="result-btn-wait">รอผลสัมภาษณ์</div>
                </td>
                <td>

                  <router-link :to="{ path: `/EditStudent/${student.id}` }" v-if="student.companyConfirm != true"
                    class="text-decoration-none btn edit-btn" style="color:white;">
                    แก้ไขข้อมูล
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
  import {
    studentCollection
  } from "@/firebase";
  import {
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import {
    getAuth
  } from "@firebase/auth";
  export default {
     components: {
      // ExportComponent,
      LoadingComponent
     },
    data() {
      return {
        loading:true,
        Students: [],
      };
    },
    methods: {
      async fetchStudentData() {
        const auth = getAuth();
        const user = auth.currentUser;
        const getDataByUid = query(studentCollection, where("userId", "==", user.uid));
        const studentSnapShot = await getDocs(getDataByUid);
        let Students = [];
        studentSnapShot.forEach((student) => {
          let studentData = student.data();
          studentData.id = student.id;
          Students.push(studentData);
        });
        this.Students = Students;
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Student') {
          alert("คุณไม่มีสิทธิ์เข้าถึง")
          this.$router.push("/")
        }
      },
        settimeOut() {
        setTimeout(() => {
          this.loading = false;
        }, "1000")
      },
    },
    created() {
      this.settimeOut();
      this.fetchStudentData();
      this.checkRole();
    },
  };
</script>


<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@500&display=swap');

  .btn {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
    margin-right: auto;
    margin-left: auto;
  }

  .Info-btn {
    width: 8rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
    margin-right: auto;
    margin-left: auto;
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
    text-align: center;
  }

  tbody {
    margin-left: 0;
    justify-content: center;

  }

  #button {
    margin-right: 5px;

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

  .result-btn-wait {
    align-items: center;
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2.5rem;
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
    align-items: center;
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    background-color: #2ec233;
    border: 0;
    border-radius: 5px;
    color: white;
    border: px solid #2ec233;
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
    align-items: center;
    margin-top: 0.7rem;
    margin-right: auto;
    margin-left: auto;
    width: 8rem;
    height: 2.5rem;
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


  .formtitle-1 {
    margin-bottom: 1rem;
    margin-top: -2vh;
    width: 250px;
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
    -webkit-user-select: none;
        animation: fade 0.3s ease-in-out 0s;
  }
   @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 100;
        }

    }
</style>