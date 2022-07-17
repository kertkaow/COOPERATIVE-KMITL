<template>
<div v-if="loading">
    <LoadingComponent />
  </div>
    <div v-else class="row justify-content-center">
        <div class="col-md-6 bgbd">
            <!-- แบบ Forms -->
            <h1 class="d-flex justify-content-center formtitle-1">ชื่อ : [ {{ Students.firstName }}
                {{ Students.lastName }} ] รหัสนักศึกษา : [ {{ Students.studentID }} ] บริษัท : [ {{ Companys.thaiName }}
                ] โครงการ : [ {{ Companys.projectName }} ] </h1>
            <form @submit.prevent="updateMemo">
                <div class="d-flex flex-column">
                    <div class="mb-2 Memo-date-Box">รายละเอียด Memo</div>
                    <textarea type="text" v-model="memoContent" rows="20" cols="10"
                        style="overflow-wrap: break-word"> </textarea>
                </div>
                <div class="form-group">
                    <button class="btn submit-btn col-12 mt-3">เพิ่ม Memo</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import LoadingComponent from "../LoadingComponent.vue"
    import {
        matchingCollection
    } from "@/firebase";
    import {
        getDoc,
        doc,
        updateDoc,
        arrayUnion
    } from "firebase/firestore";
    export default {
         components: {
      // ExportComponent,
      LoadingComponent
    },
        data() {
            return {
                loading:true,
                matchingDataId: null,
                matchingDoc: null,
                Companys: {
                    projectTeacherMentor: null,
                    projectTeacherDirector: null,
                    thaiName: null,
                    engName: null,
                    address: null,
                    email: null,
                    phone: null,
                    managerName: null,
                    managerPosition: null,
                    managerDepartment: null,
                    managerPhone: null,
                    managerEmail: null,
                    contact: null,
                    coordinatorDetails: null,
                    projectName: null,
                    projectObjective: null,
                    projectPeriod: null,
                    studentQuantityRequire: null,
                    projectDescription: null,
                    projectSkill: null,
                    projectSalary: null,
                    projectMentor: null,
                    workLocation: null,
                    projectInformantName: null,
                    projectInformantPosition: null,
                    approveStatus: null,
                },
                Students: {
                    email: null,
                    firstName: null,
                    lastName: null,
                    gpm: null,
                    mvcStatus: null,
                    studentID: null,
                    userId: null,
                    workingAt: null
                },
                CooperativeStatus: {
                    projectStatusNow: null,
                    projectExamdate: null,
                    projectStatus: null
                },
                Memo: {
                    writerFirstName: '',
                    writerLastName: '',
                    memoDate: ''
                },
                memoContent: ''
            };
        },
        methods: {
            async getMatchingData() {
                let matchingRef = doc(matchingCollection, this.matchingDataId);
                this.matchingDoc = matchingRef;
                let matching = await getDoc(this.matchingDoc);
                let matchingData = matching.data();
                this.Companys.projectTeacherMentor = matchingData.companyData.projectTeacherMentor
                this.Companys.projectTeacherDirector = matchingData.companyData.projectTeacherDirector
                this.Companys.thaiName = matchingData.companyData.thaiName
                this.Companys.engName = matchingData.companyData.engName
                this.Companys.address = matchingData.companyData.address
                this.Companys.email = matchingData.companyData.email
                this.Companys.phone = matchingData.companyData.phone
                this.Companys.managerName = matchingData.companyData.managerName
                this.Companys.managerPosition = matchingData.companyData.managerPosition
                this.Companys.managerDepartment = matchingData.companyData.managerDepartment
                this.Companys.managerPhone = matchingData.companyData.managerPhone
                this.Companys.managerEmail = matchingData.companyData.managerEmail
                this.Companys.contact = matchingData.companyData.contact
                this.Companys.coordinatorDetails = matchingData.companyData.coordinatorDetails
                this.Companys.projectName = matchingData.companyData.projectName
                this.Companys.projectObjective = matchingData.companyData.projectObjective
                this.Companys.projectPeriod = matchingData.companyData.projectPeriod
                this.Companys.studentQuantityRequire = matchingData.companyData.studentQuantityRequire
                this.Companys.projectDescription = matchingData.companyData.projectDescription
                this.Companys.projectSkill = matchingData.companyData.projectSkill
                this.Companys.projectSalary = matchingData.companyData.projectSalary
                this.Companys.projectMentor = matchingData.companyData.projectMentor
                this.Companys.workLocation = matchingData.companyData.workLocation
                this.Companys.projectInformantName = matchingData.companyData.projectInformantName
                this.Companys.projectInformantPosition = matchingData.companyData.projectInformantPosition
                this.Companys.approveStatus = matchingData.companyData.approveStatus
                this.Students.email = matchingData.studentData.email
                this.Students.firstName = matchingData.studentData.firstName
                this.Students.lastName = matchingData.studentData.lastName
                this.Students.gpm = matchingData.studentData.gpm
                this.Students.mvcStatus = matchingData.studentData.mvcStatus
                this.Students.studentID = matchingData.studentData.studentID
                this.Students.userId = matchingData.studentData.userId
                this.Students.workingAt = matchingData.studentData.workingAt
                this.CooperativeStatus.projectStatusNow = matchingData.cooperativeStatus.projectStatusNow
                this.CooperativeStatus.projectExamdate = matchingData.cooperativeStatus.projectExamdate
                this.Memo = matchingData.Memo
                this.CooperativeStatus.projectStatus = matchingData.cooperativeStatus.projectStatus
                console.log(this.Companys.projectTeacherDirector.userName)
            },
            async updateMemo() {
                await updateDoc(this.matchingDoc, {
                    'Memo': arrayUnion({
                        'writeRole': 'อาจารย์ที่ปรึกษา',
                        'memoContent': this.memoContent,
                        'writerName': this.Companys.projectTeacherMentor.userName,
                        'memoDate': new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })
                    })
                });
                alert(
                    `เพิ่ม Memo เรียบร้อยแล้ว`
                );
                this.$router.back()
            },
            settimeOut() {
                setTimeout(() => {
                    this.loading = false;
                }, 1000)
            }
        },
        created() {
            let matchingDataId = this.$route.params.matchingDataId;
            this.matchingDataId = matchingDataId;
            this.settimeOut();
            this.getMatchingData();
        },
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    select {
        width: 15rem;
        height: 1.8rem;
        margin-top: 0.3rem;
        margin-bottom: 0.3rem;
        border-radius: 0.3rem;
    }

    /* Body */
    h1 {
        animation: fade 0.3s ease-in-out forwards 0s;
    }

    label,
    input {
        line-height: 28px;
    }

    label {
        margin-top: 0.7vh;
    }

    button {
        border: 1px solid var(--contrast-color);
        border-radius: 50px;
        padding: 8px 12px;
        font-size: 16px;
        text-transform: uppercase;
        position: relative;
        margin-top: 15px;
        outline: none;
        animation: fade 0.3s ease-in-out forwards 0s;

    }

    .Mvc-pass {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8vh;
        height: 4vh;
        border: 2px solid rgb(22, 184, 22);
        transition: 0.3s;
    }

    .Mvc-pass:hover {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8vh;
        height: 4vh;
        border: 3px solid rgb(22, 184, 22);
        background: rgb(22, 184, 22);
        color: white
    }

    input:checked~.Mvc-pass {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8vh;
        height: 4vh;
        border: 3px solid rgb(22, 184, 22);
        background: rgb(22, 184, 22);
        color: white
    }

    .Mvc-not-pass {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8vh;
        height: 4vh;
        border: 2px solid rgb(242, 26, 26);
        transition: 0.3s;
    }

    .Mvc-not-pass:hover {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8vh;
        height: 4vh;
        border: 3px solid rgb(242, 26, 26);
        background: rgb(242, 26, 26);
        color: white
    }

    input:checked~.Mvc-not-pass {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8vh;
        height: 4vh;
        border: 3px solid rgb(242, 26, 26);
        background: rgb(242, 26, 26);
        color: white
    }

    .submit {
        display: flex;
    }

    .submit-btn {
        margin: auto;
        display: block;
        width: 15rem;
        padding: 10px 20px;
        border: 2px solid #FF6E30;
        background: #FF6E30;
        border-radius: 50px;
        color: white;
        font-size: 18px;
        font-weight: 600;
        text-decoration: none;
        transition: 0.3s;
    }

    .submit-btn:hover {
        background: #c04a17;
        border: 2px solid #c04a17;
        color: white;
    }

    div.bgbd {
        border-radius: 15px;
        background: white;
        border: 0.3rem solid #FF6E30;
        width: 100%;
        height: auto;
        padding: 3rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
        animation: fade 0.3s ease-in-out forwards 0s;

    }

    .Memo-Box {
        display: inline-block;
        background: white;
        border: 0.3rem solid #1871ff;
        width: 100%;
        height: auto;
        min-height: 300px;
        padding: 1rem;
        position: relative;
        overflow: visible;
        white-space: normal;
    }

    .Memo-Text {
        margin-left: 1px;
        margin-top: 1px;
        position: absolute;
        top: 2px;
        left: 10px;
        text-align: left;
        width: 100%;
        display: block;
    }

    .formtitle-1 {
        margin-bottom: 1rem;
        margin-top: -2vh;
        margin-left: 0;
        width: 100%;
        justify-content: center;
        text-align: center;
        background-color: #FF6E30;
        border: 0;
        border-radius: 10px;
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
    }

    .Memo-date-Box {
        text-align: center;
        display: inline-block;
        background: #0095ff;
        color: white;
        font-weight: 500;
        border-radius: 7px;
        width: 100%;
        max-width: 200px;
        height: auto;
        padding: 0.3rem 0.6rem;
        white-space: normal;
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 100;
        }

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
            transform: translateX(500px);
        }

        100% {
            transform: translateX(0px);
        }
    }

    @keyframes expandForm {
        0% {
            transform: translateX(50px);
        }

        100% {
            transform: translateX(0px);
        }
    }
</style>