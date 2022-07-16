<template>
<!-- The sidebar -->
<div class="row">
<div class="col col-2" style="margin-top:80px;max-width: 220px;">
<div class="sidebar">
  <a href="/AdminCompany" >เเบ่งกลุ่มตามโครงการ/อนุมัติสิทธิ์</a>
  <a href="/AllCompanyView" >เเสดงความประสงค์ที่ปรึกษา/กรรมการนิเทศสหกิจ</a>
  <a href="/AdminStudent" style="background:#FF6E30;color:white">บันทึกผลการสัมภาษณ์</a>
  <a href="/AdminMatching">สหกิจศึกษา</a>
</div>
</div>
        <div class="col col-10">  
            <!-- Display Student Content -->
            <h1 class="mb-4 formtitle-1 ">ข้อมูลนักศึกษา (Admin)</h1> 
            <select class="mb-3 filter-option"   @change="selectedOption($event)">
              <option value="orderByStudentID">รหัสนักศึกษา</option>
              <option value="orderBySubmitDate">วันที่ลงทะเบียน</option>
              <option value="orderByStudentName">ชื่อนักศึกษา</option>
              <option value="orderByNotGotCompany">นักศึกษาที่ไม่มีบริษัทฝึกงาน</option>
              <option value="orderByGotCompany">นักศึกษาที่มีบริษักฝึกงาน</option>
            </select>
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
                                <th>จัดการข้อมูล</th>
                            </tr>
                        </thead>
                        <tbody>
                         <tr v-for="student in Students" :key="student.id">
                                 <td>
                                   <router-link :to="{ path: `/StudentDetails/${student.id}` }" class="text-decoration-none btn btn-primary Info-btn" style="color:white;">
                                    ข้อมูลนักศึกษา
                                    </router-link>
                                 </td>
                                 <td>{{ student.studentID }}</td>
                                 <td>{{ student.firstName }}</td>
                                 <td>{{ student.lastName }}</td>
                                 <td>
                                   <router-link class="text-decoration-none" style="color: black;" :to="{ path: `/CompanyDetails/${student.firstChoice.project_Id}` }">{{ student.firstChoice.companyNameAndProjectName }}</router-link>
                                    <select v-if="student.gotCompany !== true" v-model="student.firstChoice.result" @change="onChangeFirstChoice($event,student.id)" class="selectData">
                                      <option :value="true">ผ่าน</option>
                                      <option :value="false">ไม่ผ่าน</option>
                                      <option :value="''">รอผลสัมภาษณ์</option>
                                    </select>
                                    <select v-else-if="student.gotCompany == true" v-model="student.firstChoice.result" @change="onChangeFirstChoice($event,student.id)" class="selectData" disabled>
                                      <option :value="true" >ผ่าน</option>
                                      <option :value="false" >ไม่ผ่าน</option>
                                      <option :value="''" >รอผลสัมภาษณ์</option>
                                    </select>
                                    <button v-if="student.firstChoice.result === 'true' && student.gotCompany !== true" class="btn btn-primary mt-2" @click="chooseCompany(student.firstChoice.project_Id,student.firstChoice.companyNameAndProjectName,student.id,student.userId)">เลือกบริษัท</button>
                                </td>
                                  <td>
                                    <router-link class="text-decoration-none" style="color: black;" :to="{ path: `/CompanyDetails/${student.secondChoice.project_Id}` }">{{ student.secondChoice.companyNameAndProjectName }}</router-link>
                                    <select v-if="student.gotCompany !== true" v-model="student.secondChoice.result" @change="onChangeSecondChoice($event,student.id)" class="selectData">
                                      <option :value="true">ผ่าน</option>
                                      <option :value="false">ไม่ผ่าน</option>
                                      <option :value="''">รอผลสัมภาษณ์</option>
                                    </select>
                                    <select v-else-if="student.gotCompany == true" v-model="student.secondChoice.result" @change="onChangeSecondChoice($event,student.id)" class="selectData" disabled>
                                      <option :value="true" >ผ่าน</option>
                                      <option :value="false" >ไม่ผ่าน</option>
                                      <option :value="''" >รอผลสัมภาษณ์</option>
                                    </select>
                                    <button v-if="student.secondChoice.result === 'true' && student.gotCompany !== true" class="btn btn-primary mt-2" @click="chooseCompany(student.secondChoice.project_Id,student.secondChoice.companyNameAndProjectName,student.id,student.userId)">เลือกบริษัท</button>
                                </td>
                                 <td>
                                   <router-link class="text-decoration-none" style="color: black;" :to="{ path: `/CompanyDetails/${student.thirdChoice.project_Id}` }">{{ student.thirdChoice.companyNameAndProjectName }}</router-link>
                                    <select v-if="student.gotCompany !== true" v-model="student.thirdChoice.result" @change="onChangeThirdChoice($event,student.id)" class="selectData">
                                      <option :value="true">ผ่าน</option>
                                      <option :value="false">ไม่ผ่าน</option>
                                      <option :value="''">รอผลสัมภาษณ์</option>
                                    </select>
                                    <select v-else-if="student.gotCompany == true" v-model="student.thirdChoice.result" @change="onChangeThirdChoice($event,student.id)" class="selectData" disabled>
                                      <option :value="true" >ผ่าน</option>
                                      <option :value="false" >ไม่ผ่าน</option>
                                      <option :value="''" >รอผลสัมภาษณ์</option>
                                    </select>
                                    <button v-if="student.thirdChoice.result === 'true' && student.gotCompany !== true" class="btn btn-primary  mt-2" @click="chooseCompany(student.thirdChoice.project_Id,student.thirdChoice.companyNameAndProjectName,student.id,student.userId)">เลือกบริษัท</button>
                                </td>
                                 <td v-if="student.gotCompany !== true">
                                    <router-link :to="{ path: `/AdminEditStudent/${student.id}` }" class="text-decoration-none btn edit-btn" style="color:white;">
                                    แก้ไขบริษัท
                                    </router-link>
                                    <button @click.prevent="deleteStudentData(student.id)" class="btn btn-danger Delete-btn">
                                         ลบข้อมูล
                                    </button>
                                 </td>
                                 <td v-else>
                                    <router-link :to="{ path: `/MatchingDetails/${student.id}` }" class="btn btn-primary" style="width:7rem">
                                         ข้อมูลสหกิจ
                                    </router-link>
                                 </td>
                                 </tr>
                             </tbody>
                    </table>
                </div>
            </div>
</template>
<script>
import { companyCollection, studentCollection, matchingCollection} from "@/firebase";
import { getDocs, doc, deleteDoc, getDoc, updateDoc, query, orderBy, setDoc, where} from "firebase/firestore";
    export default {
    data() {
                return {
                    selectOption:'orderByStudentID',
                    studentDataId:'',
                    studentDoc:null,
                    Students:[],
                    StudentByID: [],
                    StudentByDate: [],
                    StudentByName: [],
                    StudentNotGotCompany:[],
                    StudentGotCompany:[],
                    Companys:[],
                    cooperative : {
                      cooperativeStatus : {
                      projectStatusNow:'กำลังฝึกงาน',
                      Memo:'',
                      projectExamdate:'',
                      projectStatus:''
                      }
                    },
                    matchings:[],
                    userId:'',
                    userDoc:''
                    }
                },
    methods: {
       async fetchStudentData() {
      const orderBySubmitDateTime = query(studentCollection, orderBy("StudentSubmitDate", "asc"))
      const studentDateSnapShot = await getDocs(orderBySubmitDateTime);
      let StudentByDate = [];
      studentDateSnapShot.forEach((student) => {
      let studentData = student.data();
      studentData.id = student.id;
      StudentByDate.push(studentData);
       });
      this.StudentByDate = StudentByDate;
      const orderByStudentID = query(studentCollection, orderBy("studentID", "asc"))
      const studentIDSnapShot = await getDocs(orderByStudentID);
      let StudentByID = [];
      studentIDSnapShot.forEach((student) => {
      let studentData = student.data();
      studentData.id = student.id;
      StudentByID.push(studentData);
       });
      this.StudentByID = StudentByID;
      this.Students = StudentByID;
      const orderByStudentName = query(studentCollection, orderBy("firstName", "asc"))
      const studentNameSnapShot = await getDocs(orderByStudentName);
      let StudentByName = [];
      studentNameSnapShot.forEach((student) => {
      let studentData = student.data();
      studentData.id = student.id;
      StudentByName.push(studentData);
       });
      this.StudentByName = StudentByName;
      const orderByNotGotCompany = query(studentCollection, where("gotCompany", "==", false))
      const NotGotCompanySnapShot = await getDocs(orderByNotGotCompany);
      let StudentNotGotCompany = [];
      NotGotCompanySnapShot.forEach((student) => {
      let studentData = student.data();
      studentData.id = student.id;
      StudentNotGotCompany.push(studentData);
       });
      this.StudentNotGotCompany = StudentNotGotCompany;
      const orderByGotCompany = query(studentCollection, where("gotCompany", "==", true))
      const GotCompanySnapShot = await getDocs(orderByGotCompany);
      let StudentGotCompany = [];
      GotCompanySnapShot.forEach((student) => {
      let studentData = student.data();
      studentData.id = student.id;
      StudentGotCompany.push(studentData);
       });
      this.StudentGotCompany = StudentGotCompany;
    },
    async deleteStudentData(studentDataId) {
      if(window.confirm("ต้องการลบข้อมูลใช่หรือไม่?")) {
      let studentRef = doc(studentCollection, studentDataId);
       await deleteDoc(studentRef);
       alert("ลบข้อมูลสำเร็จ");
       this.$router.push("/AdminStudent");
       }
      },
      async onChangeFirstChoice(event,studentDataId) {
        let studentRef = doc(studentCollection, studentDataId) ;
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.Students.firstChoice = studentData.firstChoice;
        await updateDoc(studentRef, {'firstChoice.result':event.target.value});
        },
        async onChangeSecondChoice(event,studentDataId) {
        let studentRef = doc(studentCollection, studentDataId) ;
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.Students.secondChoice = studentData.secondChoice;
        await updateDoc(studentRef, {'secondChoice.result':event.target.value});
        },
        async onChangeThirdChoice(event,studentDataId) {
        let studentRef = doc(studentCollection, studentDataId) ;
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.Students.thirdChoice = studentData.thirdChoice;
        await updateDoc(studentRef, {'thirdChoice.result':event.target.value});
        },
        async chooseCompany(companyDataId,companyName,studentDataId) {
        this.studentDataId = studentDataId
        let studentRef = doc(studentCollection, studentDataId);
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        this.StudentDataById = studentData
        let companyRef = doc(companyCollection, companyDataId);
        this.companyDoc = companyRef;
        let company = await getDoc(this.companyDoc);
        let companyData = company.data();
        this.Companys = companyData
        if(window.confirm("ต้องการเลือกบริษัทให้ : [ นาย " + studentData.firstName + " " + studentData.lastName + " ] ฝึกงานที่บริษัท : [ " + companyName + " ] ใช่หรือไม่?")) {
        const matchingRef = doc(matchingCollection, studentDataId)
        const setDocStatus = await setDoc(matchingRef, {
          studentData,
          companyData,
          ...this.cooperative,
        }
        )
        console.log(setDocStatus)
        await updateDoc(studentRef, {gotCompany:true});
        }
        if(window.confirm("คุณต้องการยืนยันบริษัทของนักศึกษาชื่อ : [ " + studentData.firstName + " " + studentData.lastName + " ] รหัสนักศึกษา : [ " + studentData.studentID + " ] ใช่หรือไม่?" )) {
        await updateDoc(studentRef, {'companyConfirm':true});
        alert("ยืนยันบริษัทของนักศึกษาชื่อ : [ " + studentData.firstName + " " + studentData.lastName + " ] รหัสนักศึกษา : [ " + studentData.studentID + " ] เรียบร้อยแล้ว" )
        this.$router.push("/AdminStudent")
        }
        },
        async gotCompany() {
        const matchingRef = query(matchingCollection)
        const matchingSnapShot = await getDocs(matchingRef);
        let matchings = [];
        matchingSnapShot.forEach((matching) => {
        let matchingData = matching.data();
        matchingData.id = matching.id;
        matchings.push(matchingData);
       });
       this.matchings = matchings;
       },
       async confirmCompany(studentDataId){
        let studentRef = doc(studentCollection, studentDataId) ;
        this.studentDoc = studentRef;
        let student = await getDoc(this.studentDoc);
        let studentData = student.data();
        if(window.confirm("คุณต้องการยืนยันบริษัทของนักศึกษาชื่อ : [ " + studentData.firstName + " " + studentData.lastName + " ] รหัสนักศึกษา : [ " + studentData.studentID + " ] ใช่หรือไม่?" )) {
        await updateDoc(studentRef, {'companyConfirm':true});
        alert("ยืนยันบริษัทของนักศึกษาชื่อ : [ " + studentData.firstName + " " + studentData.lastName + " ] รหัสนักศึกษา : [ " + studentData.studentID + " ] เรียบร้อยแล้ว" )
        this.$router.go("/AdminStudent")
        }
       },
        selectedOption(event) {
          this.selectOption = event.target.value;
          if(this.selectOption == 'orderByStudentID' || this.selectOption == '') {
            this.Students = this.StudentByID
          }
          else if(this.selectOption == 'orderBySubmitDate') {
            this.Students = this.StudentByDate
          }
          else if(this.selectOption == 'orderByStudentName') {
            this.Students = this.StudentByName
          }
          else if(this.selectOption == 'orderByNotGotCompany') {
            this.Students = this.StudentNotGotCompany
          }
          else if(this.selectOption == 'orderByGotCompany') {
            this.Students = this.StudentGotCompany
          }
        },
       checkRole() {
           const userRole = sessionStorage.getItem("userRole")
           if(userRole != 'Teacher') {
            alert("คุณไม่มีสิทธิ์เข้าถึง")
            this.$router.push("/")
            }
         }
    },
  created() {
     this.fetchStudentData();
     this.gotCompany();
     this.checkRole();
   },
 };
</script>
<style scoped>
.Delete-btn {
  display: flex;
  width: 7rem;
  justify-content: center;
  margin: 0.07rem;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  margin-bottom: 0.3rem;
}
.Info-btn {
  display: flex;
  width: 8rem;
  justify-content: center;
  margin: 0.07rem;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  margin-bottom: 0.3rem;
}
.filter-option {
  display:inline-flex;
  margin-left: 1vh;
  border-radius: 10px;
  width: 25vh;
  animation: fadeInOpacity 0.8s ease-in-out;
}
.getCompany {
  margin-right: 0;
  margin-left: 0;
  width: 15rem;
  justify-content: center;
  margin: 0.07rem;
  text-align: center;
  margin-bottom: 0.3rem;
}
th,tr,td,th {
    text-align: center;
    justify-content: center;
    width:1200px;
}
table{
    justify-content: center;
    animation: expandRight 0.8s ease-in-out 0s;
    text-align: center;
}
tbody {
   margin-left: 0;
  justify-content: center;
}
#button{
    margin-right: 5px;
}
.clm{
    border: 0.2rem solid #FF6E30;
    border-radius: 10px;
    color: white;
}
.edit-btn{
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
.edit-btn:hover{
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
.selectData {
  display: flex;
  margin-top:0.7rem;
  margin-right: auto;
  margin-left: auto;
  width: 8rem;
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
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 18px;
  font-weight: 600;
  outline: 0;
  padding: 16px 21px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all .3s;
  user-select: none;
  animation: expandLeft 0.8s ease-in-out 0s;
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
.fade-in {
 opacity: 1;
 animation-name: fadeInOpacity;
 animation-iteration-count: 1;
 animation-timing-function: ease-in;
 animation-duration: 1s;
}
@keyframes fadeInOpacity {
 0% {
 opacity: 0;
 }
 100% {
 opacity: 1;
 }
}
.result-btn-wait {
  margin-top:0.7rem;
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
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
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
  margin-top:0.7rem;
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
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 20px;
  font-weight: 100;
  outline: 0;
  position: relative;
  text-align: center;
  transition: all .3s;
  user-select: none;
}
.result-btn-not-pass {
  margin-top:0.7rem;
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
  font-family: system-ui,-apple-system,system-ui,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",sans-serif;
  font-size: 20px;
  font-weight: 100;
  outline: 0;
  text-align: center;
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
}
.filter-option {
  display:inline-flex;
  margin-left: 1vh;
  border-radius: 10px;
  width: 25vh;
  animation: fadeInOpacity 0.8s ease-in-out;
}
.sidebar {
  padding: 0;
  width:100%;
  max-width: 200px;
  background-color: #f1f1f1;
  height: auto;
  overflow: auto;
  transition: 0.3s;
  animation: fadeInOpacity 0.5s ease-in-out 0s;
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
.sidebar a.active {
  background-color: #FF6E30;
  color: white;
}

/* Links on mouse-over */
.sidebar a:hover:not(.active) {
  background-color: rgb(85, 85, 85);
  color: white;
}

</style>
