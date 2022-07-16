<template>
    <div class="form-group">
        <label for="file">*หมายเหตุ รายละเอียดของโครงการสามารถเป็นเอกสารแนบมาได้
            และในกรณีที่บริษัทนำเสนอโครงการสหกิจเป็นครั้งแรกให้กับภาควิชาวิทยาการคอมพิวเตอร์
            คณะวิทยาศาสตร์ สจล.
            กรุณาแนบเอกสารแนะนำบริษัทของท่านมาในเอกสารแนบด้วย</label>
        <input type="file" class="form-control" @change="uploadFile" />
        <p>{{progress}}%</p>
        <button class="btn submit-btn mt-5" @click="onUpload">upload</button>
    </div>
</template>
<script>
    import {
        storage
    } from '@/firebase';
    import {
        ref,
        uploadBytesResumable
    } from "firebase/storage";
    export default {
        data() {
            return {
                uploadTask: null,
                progress: 0
            }
        },
        methods: {
            //อัพโหลดไฟล์
            uploadFile(e) {
                this.uploadTask = e.target.files[0]
            },
            onUpload() {
                const storageRef = ref(storage, 'companyfiles/' + this.uploadTask.name);
                this.uploadTask = uploadBytesResumable(storageRef, this.uploadTask)
                this.uploadTask.on('state_changed', (snapshot) => {
                        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        console.log(error)
                    },
                    () => {
                        (this.uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                        });
                    }, )
            }
        }

    }
</script>

<style>

</style>

<template>
    <NavbarCompany />
    <div class="row justify-content-center">
        <div class="col-md-6 bgbd">
            <!-- แบบ Forms -->
            <h1 class="d-flex justify-content-center formtitle-1">แบบฟอร์มเสนอโครงการสหกิจศึกษา</h1>
            <form @submit.prevent="createCompanyData">
                <div class="form-group">
                    <label for="thaiName">ชื่อสถานประกอบการ/หน่วยงาน (ภาษาไทย)</label>
                    <input type="text" class="form-control" v-model="thaiName" required>
                </div>
                <div class="form-group">
                    <label for="engName">ชื่อสถานประกอบการ/หน่วยงาน (ภาษาอังกฤษ)</label>
                    <input type="text" class="form-control" v-model="engName" required>
                </div>
                <div class="form-group">
                    <label for="address">ที่อยู่</label>
                    <input type="text" class="form-control" v-model="address" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">เบอร์โทรศัพท์</label>
                    <input type="text" class="form-control" v-model="phone" required>
                </div>
                <div class="form-group">
                    <label for="managerName">ชื่อผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ชื่อ-สกุล)</label>
                    <input type="text" class="form-control" v-model="managerName" required>
                </div>
                <div class="form-group">
                    <label for="managerPosition">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (ตำแหน่ง)</label>
                    <input type="text" class="form-control" v-model="managerPosition" required>
                </div>
                <div class="form-group">
                    <label for="managerDepartment">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (แผนก)</label>
                    <input type="text" class="form-control" v-model="managerDepartment" required>
                </div>
                <div class="form-group">
                    <label for="managerPhone">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (เบอร์โทรศัพท์)</label>
                    <input type="text" class="form-control" v-model="managerPhone" required>
                </div>
                <div class="form-group">
                    <label for="managerEmail">ผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ (อีเมล)</label>
                    <input type="text" class="form-control" v-model="managerEmail" required>
                </div>

                <!-- Check Box ติดต่อประสานงาน -->
                <label for="contact" class="">หากมหาวิทยาลัยฯ
                    ประสงค์จะติดต่อประสานงานในรายละเอียดกับสถานประกอบการ/หน่วยงาน ขอให้ติดต่อที่ใคร</label>
                <div class="form-group">
                    <input type="radio" class="btn-check"
                        value="ติดต่อโดยตรงกับผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ" id="contact1"
                        v-model="contact" required>
                    <label class="btn btn-focus mt-2" for="contact1">
                        ติดต่อโดยตรงกับผู้จัดการโครงการ/หัวหน้าหน่วยงาน/ผู้จัดการ
                    </label>
                </div>
                <div class="form-group">
                    <input type="radio" class="btn-check"
                        value="ติดต่อกับบุคคลที่สถานประกอบการ/หน่วยงาน มอบหมายต่อไปนี้" id="contact2" v-model="contact"
                        required>
                    <label class="btn btn-focus mt-2" for="contact2">
                        ติดต่อกับบุคคลที่ สถานประกอบการ/หน่วยงาน มอบหมายต่อไปนี้ (หากตอบข้อนี้กรุณาตอบคำถามด้านล่าง)
                    </label>
                </div>

                <div class="form-group">
                    <label for="coordinatorDetails">หากข้อที่แล้วตอบข้อ 2
                        โปรดใส่รายละเอียดของผู้ประสานงานของสถานประกอบการ/หน่วยงาน ผู้ประสานงานของสถานประกอบการ/หน่วยงาน
                        (ชื่อ-สกุล, ตำแหน่ง, แผนก, โทรศัพท์, อีเมล)</label>
                    <input type="text" class="form-control" v-model="coordinatorDetails" required>
                </div>
                <div class="form-group">
                    <label for="projectName">ชื่อโครงการ</label>
                    <input type="text" class="form-control" v-model="projectName" required>
                </div>
                <div class="form-group">
                    <label for="projectObjective">วัตถุประสงค์ของโครงการ</label>
                    <input type="text" class="form-control" v-model="projectObjective" required>
                </div>
                <div class="form-group">
                    <label for="projectPeriod">ระยะเวลาของโครงการ ตั้งแต่เดือนไหนถึงเดือนไหน</label>
                    <input type="text" class="form-control" v-model="projectPeriod" required>
                </div>
                <div class="form-group">
                    <label for="studentQuantityRequire">จำนวนนักศึกษาที่ต้องการ</label>
                    <input type="number" class="form-control" v-model="studentQuantityRequire" required>
                </div>
                <div class="form-group">
                    <label for="projectDescription">ลักษณะงานที่นักศึกษาต้องปฏิบัติและรับผิดชอบ</label>
                    <input type="text" class="form-control" v-model="projectDescription" required>
                </div>
                <div class="form-group">
                    <label for="projectSkill">เครื่องมือและทักษะที่ต้องใช้ในการทำโครงการ</label>
                    <input type="text" class="form-control" v-model="projectSkill" required>
                </div>
                <div class="form-group">
                    <label for="projectSalary">เงินเดือนฝึกงาน</label>
                    <input type="text" class="form-control" v-model="projectSalary" required>
                </div>
                <div class="form-group">
                    <label for="projectMentor">พี่เลี้ยงประจำโครงการ (มีได้มากกว่า 1 คน) โปรดใส่ ชื่อ-สกุล ตำแหน่ง
                        เบอร์โทรศัพท์ และอีเมล</label>
                    <input type="text" class="form-control" v-model="projectMentor" required>
                </div>

                <!-- Check Box สถานที่ทำงาน -->
                <label for="workLocation" class="check-button">สถานที่ปฏิบัติงาน</label>
                <div class="form-group buttonfocus">
                    <input type="radio" class="btn-check" value="บริษัท" id="workLocation1" v-model="workLocation"
                        required>
                    <label class="btn btn-focus mt-2" for="workLocation1">
                        บริษัท
                    </label>
                </div>
                <div class="form-group buttonfocus">
                    <input type="radio" class="btn-check btn-focus" value="Work From Home" id="workLocation2"
                        v-model="workLocation" required>
                    <label class="btn btn-focus mt-2" for="workLocation2">
                        Work From Home
                    </label>
                </div>

                <div class="form-group">
                    <label for="projectInformantName">ลงชื่อผู้ให้ข้อมูลนี้</label>
                    <input type="text" class="form-control" v-model="projectInformantName" required>
                </div>
                <div class="form-group">
                    <label for="projectInformantPosition">ตำแหน่งผู้ให้ข้อมูลนี้</label>
                    <input type="text" class="form-control" v-model="projectInformantPosition" required>
                </div>

                <div class="form-group">
                    <label for="file">
                        *หมายเหตุ รายละเอียดของโครงการสามารถเป็นเอกสารแนบมาได้
                        และในกรณีที่บริษัทนำเสนอโครงการสหกิจเป็นครั้งแรกให้กับภาควิชาวิทยาการคอมพิวเตอร์
                        คณะวิทยาศาสตร์ สจล.
                        กรุณาแนบเอกสารแนะนำบริษัทของท่านมาในเอกสารแนบด้วย</label>
                    <input type="file" class="form-control" @change="uploadFile" />
                    <p>{{progress}}%</p>
                </div>
                <!-- Submit Button -->
                <div class="form-group d-flex justify-content-center">
                    <button class="btn submit-btn mt-5">ลงทะเบียนโครงการสหกิจศึกษา</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import NavbarCompany from "@/components/NavbarCompany.vue"
    import {
        companyCollection,
        storage
    } from '@/firebase';
    import {
        setDoc,
        serverTimestamp,
        updateDoc
    } from '@firebase/firestore';
    import {
        getAuth
    } from '@firebase/auth';
    import {
        ref,
        uploadBytesResumable
    } from "firebase/storage";

    export default {
        components: {
            NavbarCompany,
        },
        data() {
            return {
                thaiName: '',
                engName: '',
                address: '',
                email: '',
                phone: '',
                managerName: '',
                managerPosition: '',
                managerDepartment: '',
                managerPhone: '',
                managerEmail: '',
                contact: '',
                coordinatorDetails: '',
                projectName: '',
                projectObjective: '',
                projectPeriod: '',
                studentQuantityRequire: '',
                projectDescription: '',
                projectSkill: '',
                projectSalary: '',
                projectMentor: '',
                workLocation: '',
                projectInformantName: '',
                projectInformantPosition: '',
                companyLevel: '',
                approveStatus: false,
                projectMentorSigned: '',
                projectDirectorSigned: '',
                projectTeacherMentor: {
                    userName: '',
                    userId: ''
                },
                projectTeacherDirector: {
                    userName: '',
                    userId: ''
                },
                uploadTask: null,
                progress: 0
            }
        },
        methods: {
            async createCompanyData() {
                const storageRef = ref(storage, 'companyfiles/' + this.uploadTask.name);
                this.uploadTask = uploadBytesResumable(storageRef, this.uploadTask)
                this.uploadTask.on('state_changed', (snapshot) => {
                        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        console.log(error)
                    },
                    () => {
                        (this.uploadTask.snapshot.ref).then((downloadURL) => {
                            const addCompanyData2 = updateDoc(companyCollection, {
                                ...
                                this.$data,
                                files: this.uploadTask,
                            });
                            console.log(addCompanyData2)
                            console.log('File available at', downloadURL);
                        });
                    }, )
                try {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    const addCompanyData = await setDoc(companyCollection, {
                        ...
                        this.$data,
                        CompanySubmitDate: serverTimestamp(),
                        userSubmitForm: user.uid
                    });
                    console.log(addCompanyData);
                    alert("ลงทะเบียนสหกิจศึกษาเรียบร้อยแล้ว");
                    this.$router.push('/showprojectcom');


                } catch (err) {
                    console.log(err)
                }

            },
            //อัพโหลดไฟล์
            uploadFile(e) {
                this.uploadTask = e.target.files[0]
            },


        }
    }