<template>
  <div v-if="loading">
    <LoadingComponent />
  </div>
  <div v-else class="row justify-content-center">
    <div class="col-md-12">
      <!-- Display Student Content -->
      <h1 class="mb-4 formtitle-1">ข้อมูลโครงการสหกิจ</h1>
      <div class="row">
        <div class="col-md-12">
          <table class="table table-hover">
            <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
              <tr>
                <th>รายละเอียด</th>
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
                <th>สถานะการอนุมัติ</th>
                <th>จัดการข้อมูล</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="company in Companys" :key="company.id">
                <td>
                  <router-link :to="{path: `/CompanyDetails/${company.id}`}"
                    class="text-decoration-none btn btn-primary" style="color:white;">
                    ดูข้อมูล
                  </router-link>
                </td>
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
                <td>
                  <div v-if="company.approveStatus === true">
                    อนุมัติแล้ว </div>
                  <div v-else-if="company.approveStatus === false">ไม่อนุมัติ</div>
                  <div v-else>รอการอนุมัติ</div>
                </td>
                <td v-if="company.approveStatus !== true">
                 <router-link v-if="company.fileStatus === true" :to="{path: `/ShowFileCompany/${company.id}`}"
                    class="text-decoration-none btn btn-document-uploaded">
                    เอกสารแนบ
                  </router-link>
                    <router-link v-else :to="{path: `/ShowFileCompany/${company.id}`}"
                    class="text-decoration-none btn btn-secondary">
                    เอกสารแนบ
                  </router-link>
                  <router-link :to="{path: `/EditCompany/${company.id}`}" class="text-decoration-none btn edit-btn"
                    style="color:white;">
                    แก้ไขข้อมูล
                  </router-link>
                  <button @click.prevent="deleteCompanyData(company.id)" class="btn btn-danger">
                    ลบข้อมูล
                  </button>
                </td>
                <td v-else>
                    <router-link v-if="company.fileStatus === true" :to="{path: `/ShowFileCompany/${company.id}`}"
                    class="text-decoration-none btn btn-document-uploaded">
                    เอกสารแนบ
                  </router-link>
                    <router-link v-else :to="{path: `/ShowFileCompany/${company.id}`}"
                    class="text-decoration-none btn btn-secondary">
                    เอกสารแนบ
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
    companyCollection
  } from "@/firebase";
  import {
    getDocs,
    query,
    where,
    deleteDoc,
    doc,
  } from 'firebase/firestore'
  import {
    getAuth
  } from '@firebase/auth';
  export default {
     components: {
            // ExportComponent,
            LoadingComponent
        },
    data() {
      return {
        loading:true,
        Companys: [],
      };
    },
    methods: {
      async fetchCompanyData() {
        const auth = getAuth();
        const user = auth.currentUser;
        const getCompanyData = query(companyCollection, where("userSubmitForm", "==", user.uid));
        let companySnapShot = await getDocs(getCompanyData);
        let Companys = [];
        companySnapShot.forEach((company) => {
          let companyData = company.data();
          companyData.id = company.id;
          Companys.push(companyData);
        });
        this.Companys = Companys;
      },
      async deleteCompanyData(companyDataId) {
        if (window.confirm("ต้องการลบข้อมูลใช่หรือไม่?")) {
          let companyRef = doc(companyCollection, companyDataId);
          await deleteDoc(companyRef);
           this.$toast.success("ลบข้อมูลสำเร็จ", {
        timeout: 2500,
        position:'top-right',
            })
          this.loading = true;
           setTimeout(() => {
                    this.loading = false;
                }, "1000")
           this.fetchCompanyData();
        }
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Company') {
            this.$toast.error("คุณไม่มีสิทธิ์เข้าถึง", {
        timeout: 2500,
        position:'top-right',
            })
          this.$router.push("/")
        }
      },
       settimeOut() {
                setTimeout(() => {
                    this.loading = false;
                }, "1000")
            }
    },
    async created() {
      this.settimeOut();
      this.fetchCompanyData();
      this.checkRole();
    },
  };
</script>

<style scoped>
  .btn {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;
  }

  th,
  tr,
  td,
  th {
    text-align: center;
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

  .edit-btn {
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

  .edit-btn:hover {
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

  .btn-document {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0.3rem;
    background: #a8a8a8;
    border: 2px solid #a8a8a8;
    color: white;
  }

  .btn-document:hover {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0.3rem;
    background: #848484;
    border: 2px solid #848484;
  }

   
   .btn-document-uploaded {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0.3rem;
    background: #00bd10;
    border: 2px solid #00bd10;
    color: white;
  }
  .btn-document-uploaded:hover {
    width: 7rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 0.3rem;
    background: #009b0d;
    border: 2px solid #009b0d;
  }


  .clm {
    border: 0.2rem solid #FF6E30;
    border-radius: 10px;
    color: white;
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

  @keyframes expand {
    0% {
      transform: translateX(1400px);
    }

    100% {
      transform: translateX(0px);
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
   @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 100;
        }

    }
</style>