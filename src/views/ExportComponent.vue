<template>
    <div id="app">
    </div>
</template>

<script>
    import pdfMake from 'pdfmake'
    export default {
        name: 'ExportComponent',
        mounted() {
            this.export()
        },
        props: {
            studentID:String,
            studentFirstName:String,
            studentLastName:String,
            companyName:String,
            projectName:String,
            teacherMentor:String,
            teacherDirector:String,
        },
        methods: {
            export () {
                const docDefinition = {
                    content: [
                        this.studentID,
                        this.studentFirstName,
                        this.studentLastName,
                        this.companyName,
                        this.projectName,
                        this.teacherMentor,
                        this.teacherDirector
                    ]
                }
                pdfMake.fonts = {
                    // download default Roboto font from cdnjs.com
                    Roboto: {
                        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
                        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
                        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
                        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
                    }
                }
                pdfMake.createPdf(docDefinition).open({}, window)
                console.log(this.studentID)
            }
        }
    }
</script>