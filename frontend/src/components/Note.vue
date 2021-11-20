<template>
    <div id="wrapper">
        <b-button id="add" @click="add">+</b-button>
        <input type="text" id="box" :key="b" v-for="b in box" :style="{top:b.x, left:b.y}">
           
    </div>
</template>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script>
export default {
    data() {
        return{
            box : []
        }
    },
    name : "note",
    methods : {
        add() {
            // this.box.push({x : "30.00px", y:"30px"})
            this.axios.post('/add',{
                x : 30,
                y : 30,
                w : 100,
                h : 200
            }).then(res=>{
                console.log("success")
            })
        }
    },
    created(){
        this.axios.get("/load",{})
        .then((res)=>{
            this.box = res
            console.log(this.box[0])
        })
    }
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
        position : absolute;
        bottom : 50px;
        right : 50px
    }
    #box{
        position : absolute;
        width: 50px;
        height: 200px;
        background-color: #5CFFEF;
    }
</style>