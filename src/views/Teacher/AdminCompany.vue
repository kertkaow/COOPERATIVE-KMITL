<template>
  <div v-if="loading">
    <LoadingComponent />
  </div>
  <!-- The sidebar -->
  <div v-else class="row">
    <div class="col col-1.5" style="margin-top:80px;max-width: 220px;">
      <div class="sidebar">
        <a href="/AdminCompany" style="background:#FF6E30;color:white">เเบ่งกลุ่มตามโครงการ/อนุมัติสิทธิ์</a>
        <a href="/AllCompanyView">เเสดงความประสงค์ที่ปรึกษา/กรรมการนิเทศสหกิจ</a>
        <a href="/AdminStudent">บันทึกผลการสัมภาษณ์</a>
        <a href="/AdminMatching">สหกิจศึกษา</a>
      </div>
    </div>

    <div class="col col-10.5">
      <!-- Display Student Content -->
      <h1 class="mb-4 formtitle-1">ข้อมูลบริษัท (Admin)
      </h1>
      <table class="table table-hover">
        <thead class="table table-striped thead-light clm" style="background-color: #FF6E30">
          <tr>
            <th>รายละเอียด</th>
            <th class="col-1">ชื่อบริษัท</th>
            <th>ชื่อโครงการ</th>
            <th class="col-2">ระยะเวลาของโครงการ</th>
            <th class="col-1">จำนวนนักศึกษาที่ต้องการ</th>
            <th>ลักษณะงาน</th>
            <th>เครื่องมือและทักษะที่ต้องใช้</th>
            <th>ระดับบริษัท</th>
            <th>สถานะการอนุมัติ</th>
            <th class="col-1">จัดการข้อมูล</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="company in Companys" :key="company.id">
            <td>
              <router-link :to="{ path: `/CompanyDetails/${company.id}` }" class="text-decoration-none"
                style="color:white;">
                <button class="btn btn-primary"> ข้อมูลบริษัท </button>
              </router-link>
            </td>
            <td>{{ company.thaiName }}</td>
            <td>{{ company.projectName }}</td>
            <td>{{ company.projectPeriod }}</td>
            <td>{{ company.studentQuantityRequire }}</td>
            <td>{{ company.projectDescription }}</td>
            <td>{{ company.projectSkill }}</td>
            <!-- ระดับบริษัท -->
            <td v-if="company.projectLevel == 3">ดีมาก</td>
            <td v-else-if="company.projectLevel == 2">ดี</td>
            <td v-else-if="company.projectLevel == 1">พอใช้</td>
            <td v-else></td>
            <!-- สถานะการอนุมัติ -->
            <td v-if="company.approveStatus == true">อนุมัติสิทธิ์แล้ว</td>
            <td v-else>ยังไม่อนุมัติสิทธิ์</td>
            <td>
              <router-link v-if="company.fileStatus === true" :to="{path: `/ShowFileCompany/${company.id}`}"
                    class="text-decoration-none btn btn-document-uploaded">
                    เอกสารแนบ
                  </router-link>
                <router-link v-else :to="{path: `/ShowFileCompany/${company.id}`}"
                    class="text-decoration-none btn btn-secondary">
                    เอกสารแนบ
                  </router-link>
              <!-- อนุมัติ -->
              <button v-if="company.approveStatus == ''" @click.prevent="approveCompany(company.id)"
                class="btn btn-primary approve-delete-btn">
                อนุมัติ
              </button>
              <button v-else @click.prevent="approveCompany(company.id)" class="btn btn-primary approve-delete-btn">
                ยกเลิกอนุมัติ
              </button>
              <!-- ลบข้อมูล -->
              <button @click.prevent="deleteCompanyData(company.id)" class="btn btn-danger approve-delete-btn ">
                ลบข้อมูล
              </button>
              <!-- เเบ่งระดับ -->
              <select v-model="company.projectLevel" @change="changeCompanyLevel($event,company.id)"
                class="btn select-btn">
                <option v-if="company.projectLevel == 1" disabled value=""> พอใช้ </option>
                <option v-else-if="company.projectLevel == 2" disabled value=""> ดี </option>
                <option v-else-if="company.projectLevel == 3" disabled value=""> ดีมาก </option>
                <option v-else disabled value=""> ระดับ </option>
                <option value="3">ดีมาก</option>
                <option value="2">ดี</option>
                <option value="1">พอใช้</option>
              </select>
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
    companyCollection
  } from "@/firebase";
  import {
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
    query,
    orderBy
  } from "firebase/firestore";
  export default {
    components: {
      // ExportComponent,
      LoadingComponent
    },
    data() {
      return {
        loading: true,
        companyDataId: null,
        approveStatus: false,
        Companys: [],
        manageCompany: false,
        sortCompanyDataBy: null,
        AllMentorSigned: [],
        selectTeacher: {
          toggle: false,
        },


      }
    },
    methods: {
      // Get and List Company Data from Database //
      async fetchCompanyData() {
        let groupByCompany = query(companyCollection, orderBy("thaiName", "desc"))
        let companySnapShot = await getDocs(groupByCompany);
        let Companys = [];
        companySnapShot.forEach((company) => {
          let companyData = company.data();
          companyData.id = company.id;
          Companys.push(companyData);
        });
        this.Companys = Companys;
      },
      // Delete Company from Database //
      async deleteCompanyData(companyDataId) {
        if (window.confirm("ต้องการลบข้อมูลใช่หรือไม่?")) {
          let companyRef = doc(companyCollection, companyDataId);
          await deleteDoc(companyRef);
           this.$toast.success("ลบข้อมูลสำเร็จ", {
        timeout: 2500,
        position:'top-right',
            })
          this.$router.go("/CompanyView");
           this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.fetchCompanyData();
        }
        
      },
      // Add Approve Status //
      async approveCompany(companyDataId) {
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.Companys.approveStatus = companyData.approveStatus;
        this.Companys.thaiName = companyData.thaiName;
        this.Companys.projectName = companyData.projectName;
        let approveMsg = '';
        if (this.Companys.approveStatus == false) {
          approveMsg = "อนุมัติ";
        } else {
          approveMsg = "ยกเลิกอนุมัติ";
        }
        if (window.confirm(("คุณต้องการ" + approveMsg + "โครงการ : " + companyData.projectName + " ของบริษัท :  " +
            companyData.thaiName) + " ใช่หรือไม่?") == true) {
          this.Companys.approveStatus = !this.Companys.approveStatus;
          await updateDoc(companyRef, {
            approveStatus: (this.Companys.approveStatus)
          });
           this.$toast.success(approveMsg + "เรียบร้อยแล้ว", {
        timeout: 2500,
        position:'top-right',
            })
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 1000)
          this.fetchCompanyData();
          this.$router.push("/AdminCompany");
        }
        return companyRef = doc(companyCollection, companyDataId);
      },

      // Add Company Level //
      async changeCompanyLevel(event, companyDataId) {
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.Companys.projectLevel = companyData.projectLevel;
        await updateDoc(companyRef, {
          'projectLevel': (event.target.value)
        });
      },
      checkRole() {
        const userRole = sessionStorage.getItem("userRole")
        if (userRole != 'Teacher') {
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
        }, 1000)
      }

    },
    created() {
      this.settimeOut()
      this.fetchCompanyData();
      this.checkRole();

    }
  }
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

  .select-btn {
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

  .btn-selectMentor {
    width: 11rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;

  }

  .btn-selectDirector {
    width: 12.5rem;
    justify-content: center;
    margin: 0.07rem;
    text-align: center;
    display: flex;
    margin-bottom: 0.3rem;

  }

  select.MentorAndDirector {
    width: 15rem;
    display: inline-table;
    justify-content: center;
    text-align: center;

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

  .manage-btn {
    display: flex;
    justify-content: center;
    width: 7rem;
    float: right;
    margin-top: 0.5rem;
    margin-right: 42rem;

  }

  .approve-delete-btn {
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

  th,
  tr,
  td,
  th {
    text-align: center;
    justify-content: center;
  }

  table {
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

  .fade-in {
    opacity: 1;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 1s;
  }

  .formtitle-1 {
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
    padding: 0;
    width: 100%;
    max-width: 200px;
    background-color: #f1f1f1;
    height: auto;
    overflow: auto;
    transition: 0.3s;
    animation: fade 0.3s ease-in-out 0s;

  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  /* Sidebar links */
  .sidebar a {
    display: block;
    color: black;
    padding: 16px;
    text-decoration: none;
    transition: 0.3s;

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