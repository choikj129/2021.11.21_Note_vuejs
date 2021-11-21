<template>
    <div id="wrapper">
        <b-button id="add" @click="add">+</b-button>
        <div class="boxwrap" :key="b" v-for="b in box" :id="b.id" @click="drag(b.id)"
        :style="{left:b.x+'px', top:b.y+'px', width:b.w+'px', height:b.h+'px'}">
            <div :style="{width:'100%', height:'20px', position:'absolute'}"></div>
            <textarea class="box"></textarea>
        </div>

        <div class="boxwrap" :style="{left:'30px', top:'100px'}">
            <div :style="{width:'300px', height:'20px', backgroundColor:'red'}"></div>
            <textarea class="box"
            :style="{width:'300px', height:'500px'}"></textarea>
        </div>
        
    </div>
</template>
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script>
export default {
    data() {
        return{
            box : [],
            x : 0,
            y : 0
        }
    },
    name : "note",
    methods : {
        add() {
            // this.box.push({x : "30.00px", y:"30px"})
            this.axios.post('/api/add',{
                x : 30,
                y : 30,
                w : 100,
                h : 200
            }).then(res=>{
                console.log("success")
            })
        },
        drag(id){
            document.getElementById(id).onmousedown = function mouseDown(e){
                e = e || window.event
                if (e.button==0){
                    this.x = e.clientX;
                    this.y = e.clientY;

                    document.onmousemove = function mouseMove(e){
                        e = e || window.event

                        var dx = this.x - e.clientX;
                        var dy = this.y - e.clientY;

                    }
                }
            }
            
        }
    },
    created(){
        this.axios.get("/api")
        .then((res)=>{
            for(var i=0; i<res.data.length; i++){
                res.data[i]["id"]="box"+res.data[i]["id"]
                this.box.push(res.data[i])
            }
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
    .boxwrap{
        position: absolute;
    }
    .box{
        position : absolute;
        background-color: #5CFFEF;
        resize: both;
    }
</style>