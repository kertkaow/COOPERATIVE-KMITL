<template>
  <div class="row justify-content-center">
    <div class="col-md-11">
      <!-- Display Student Content -->
      <h1 class="mb-2 formtitle-1">รายชื่อโครงการสหกิจ</h1>
      <div>
        <router-link v-if="userProfile.roles == 'Student'" to="/createstudent" class="btn btn-primary d-flex Info-btn mb-2">ลงทะเบียนสหกิจ</router-link>
      </div>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover">
            <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
              <tr>
                <th>ชื่อบริษัท</th>
                <th>สถานที่ทำงาน</th>
                <th>เบอร์โทร</th>
                <th>ผู้จัดการโครงการ/หัวหน้า</th>
                <th>ชื่อโครงการ</th>
                <th>วัตถุประสงค์ของโครงการ</th>
                <th>ระยะเวลาของโครงการ</th>
                <th>จำนวนนักศึกษาที่ต้องการ</th>
                <th>ลักษณะงาน</th>
                <th>เครื่องมือและทักษะที่ต้องใช้</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="company in Companys" :key="company.id">
                <td>{{ company.thaiName }}</td>
                <td>{{ company.workLocation }}</td>
                <td>{{ company.phone }}</td>
                <td>{{ company.managerName }}</td>
                <td>{{ company.projectName }}</td>
                <td>{{ company.projectObjective }}</td>
                <td>{{ company.projectPeriod }}</td>
                <td>{{ company.studentQuantityRequire }}</td>
                <td>{{ company.projectDescription }}</td>
                <td>{{ company.projectSkill }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    companyCollection,
  } from "@/firebase";
  import {
    getDocs,
    query,
    where,
  } from 'firebase/firestore'

  export default {

    data() {
      return {
        userDoc: '',
        Companys: [],
        userProfile: {
          firstName: '',
          lastName: '',
          email: '',
          roles: ''
        },
        userId: '',
        projectMentorSigned: [],
        projectDirectorSigned: []
      };

    },
    methods: {
      getUserData() {
        this.userProfile.firstName = sessionStorage.getItem("userFirstName");
        this.userProfile.lastName = sessionStorage.getItem("userLastName");
        this.userProfile.email = sessionStorage.getItem("userEmail");
        this.userProfile.roles = sessionStorage.getItem("userRole");
      },
      async fetchCompanyData() {
        const getApproveStatus = query(companyCollection, where("approveStatus", "==", true));
        let companySnapShot = await getDocs(getApproveStatus);
        let Companys = [];
        companySnapShot.forEach((company) => {
          let companyData = company.data();
          companyData.id = company.id;
          Companys.push(companyData);
        });
        this.Companys = Companys;
      },
    },
    created() {
      this.fetchCompanyData();
      this.getUserData()
    },
  }
</script>

<style scoped>
  .btn {
    width: 12rem;
    justify-content: center;
    margin: 0.07rem;
    margin-right: 100%;
    margin-left: auto;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
  }

  .signed-btn {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0.3rem;
    background: #FF6E30;
    border: 2px solid #FF6E30;
    color: white;
  }

  .signed-btn:hover {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
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
    animation: expandRight 0.5s ease-in-out 0s;
    text-align: center;
  }

  .Info-btn {
    animation: expandLeft 0.5s ease-in-out 0s;

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
    animation: expandLeft 0.5s ease-in-out 0s;
    -webkit-user-select: none;
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
</style>