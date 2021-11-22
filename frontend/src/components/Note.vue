<template>
    <div id="wrapper">
        <b-button id="add" @click="add" v-show="display==''">+</b-button>
        <div id="boxwrap" v-show="display==''">
            <b-card class="box" :key="i" v-for="(note,i) in notes" :title="note.title" :sub-title="note.date">
                <b-card-text class="content" v-html="note.content">
                </b-card-text>
            </b-card>
        </div>
        <div id="modal" v-show="display=='add'">
            <b-input-group class="mt-3">
                <b-form-input id="input" placeholder="제목"></b-form-input>
                <b-input-group-append>
                    <b-button variant="outline-dark" @click="cancel">X</b-button>
                </b-input-group-append>
            </b-input-group>
            <b-form-textarea id="textarea"></b-form-textarea>
        </div>
    </div>
</template>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script>
import $ from 'jquery'

export default {
    data() {
        return{
            notes : [
                {id:"1",title:"", date:"2020-11-22", content:"test<br>test<br>test<br>test<br>test<br>test<br>test<br>"},
                {id:"2",title:"마트", date:"2020-11-22", content:"testtest<br>test<br>test<br>test<br>test<br>test<br>test<br>test<br>"}
            ],
            display : ""
        }
    },
    name : "note",
    methods : {
        add() {
            this.display = "add"
            // this.box.push({x : "30.00px", y:"30px"})
            // this.axios.post('/api/add',{
            //     x : 30,
            //     y : 30,
            //     w : 100,
            //     h : 200
            // }).then(res=>{
            //     console.log("success")
            // })
        },
        cancel(){
            this.display = ""
        }
    },
    created(){
        // this.axios.get("/api")
        // .then((res)=>{
        //     this.notes = res.data
        // })
    }
    // beforeCreate(){
    //     this.axios.get("/api")
    //     .then((res)=>{
    //         this.notes = res.data
    //     })
    // }
}

</script>
<style>
    body {
        background-color : #EEF292;
    }
    #add{
        width : 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #5F5F4F;
        position : fixed;
        bottom : 50px;
        right : 50px
    }
    .box{
        display: block;
        background-color: rgba(92, 255, 239, 0.65);
        width : 300px;
        height: 150px;
        /* border-radius: 18px; */
        margin : 0 auto;
        margin-top: 10px;
        box-shadow: 3px 3px 3px 3px gray;
        /* padding : 0 10px; */
        overflow:hidden;
    }
    .card-body{
        /* font-family: monospace; */
        height: inherit;
        padding-top: 10px;
    }
    .title{
        font: 20px;
        font-weight: bold;
    }
    .date{
        color: grey;
    }
    .content{
        height: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: pre-line;
    }
    #modal{
        width: 600px;
        height: 800px;
        margin: 30px auto;
        border-radius: 18px;
        background-color: #F3F3CC;
    }
    #input{
        background-color: inherit;
        width: 400px;
        border: inherit;
        
    }
    #textarea{
        resize: none;
        height: 768px;
        background-color: inherit;
        border: inherit;
        border-top: gray solid 1px;
    }
</style>