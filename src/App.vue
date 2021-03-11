<template>
<div class="web-page">
    <div class="file-wrapper">
        <div class="section">
            <div class="container">
                <div class="columns">
                    <div class="column"><file-upload /></div>
                </div>
                <!-- <drop-zone /> -->
            </div>
        </div>
    </div>
</div>

  
</template>

<script>
// import ProgressBar from './components/ProgressBar.vue'
import FileUpload from './components/FileUpload.vue'

export default {
  name: 'App',
  components: {
    // ProgressBar, 
    FileUpload
  }
}
</script>

<style>
/* html {
	height:100%;
}
body {
	height:100%;
	margin:0px;
}
.web-page {
	float:left;
	height:100%;
	width:100%;
	background-color:#FF0000;
} */
/* .columns {
    max-height: 50vh;
    overflow: hidden;
} */
/** */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
body{
    background-color:#f3f2f2;
    font-family: 'Poppins', sans-serif;
    height: 100vw;
    width: 100vw;
} 

.web-page {
    margin: 0 auto;
    padding: 5%;
    background: /*antiquewhite;*/ #4a6964bf;
    height: 100vw;
    width: 100vw;
}

.section{
    /* padding: 5%; */
    margin: 0 auto;
    
    /* max-width: 100vh; */
    overflow: hidden;

}

 .file-wrapper{
     width:80%;
     /* margin:auto; */
     margin:0 auto;
     margin: 10%;
     /* height: 80vh; */
     display: flex;
     align-items: center;
     justify-content: center;
     background: #2c3e50;
 }
 .upload-btn-wrapper{
     position: relative;
     overflow: hidden;
     display: inline-block;
     cursor: pointer;
 }
 .upload-file{
     border:2px dashed #eee;
     color:#9b9b9b;
     background-color: white;
     width:400px;
     height:250px;
     border-radius: 8px;
     font-size:15px;
     cursor: pointer;
 }
 .upload-btn-wrapper input[type=file]{
     width:100%;
     position: absolute;
     left:0;
     right:0;
     top:0;
     opacity: 0;
     cursor: pointer;
     min-height: 300px;
 }
 .success{
     display:none;
 }
 .success i{
     font-size:22px;
     margin-left:6px;
     margin-top:10px;
     color:#00b665;
 }
 .font-50{
     font-size:50px;
 }
 .d-block{
     display: block;
 }
 .btn .upload-file{
     font-size:13px;
 }
 .upload-btn{
     display: block;
     font-size:18px;
     color:#00b665;
 }

 /* * {
    border: 1px solid transparent;
} */

/*
body {
    padding-bottom: 20px;
} */
</style>
