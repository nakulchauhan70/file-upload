<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data" class="level-center">
    <div
      v-if="message"
      :class="`message ${error ? 'is-danger' : 'is-success'}`"
    >
      <div class="message-body">{{ message }}</div>
    </div>
    <div class="field" >
      <div class="file is-booxed is-warning">
        <label class="file-label">
          <input
            multiple
            type="file"
            ref="uploadedFiles"
            @change="selectFile"
            class="file-input"
          />

          <span class="file-cta" :style="styleCursor">
            <span class="file-icon" :style="styleCursor">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label" :style="styleCursor">
              Choose files...
            </span>
          </span>

          <!-- <span v-if="file" class="file-name">{{ file.name }}</span> -->
        </label>
      </div>
    </div>

    <div class="field uploaded-files" :style="opacity">
      <div
        v-for="(file, index) in uploadedFiles"
        :key="index"
        :class="`level ${file.invalidMessage && 'has-text-danger'}`"
      >
        <div class="level-center"  :style="styleCursor">
          <div class="level-item">
            <span class="invalid-file">{{ file.name }}</span>
            <span class="invalid-file-msg" v-if="file.invalidMessage"
              >&nbsp;{{ file.invalidMessage }}</span
            >
          </div>
        </div>
        <div class="level-right"  :style="styleCursor">
          <div class="level-item">
            <a
              @click.prevent="uploadedFiles.splice(index, 1)"
              class="delete"
              :style="styleCursor"
            ></a>
          </div>
        </div>
      </div>
    </div>
    <!-- <div v-if="uploading" class="progress-bar">
      <div>{{ progress }}%</div>
      <div class="loading-bar">
        <div class="percentage" :style="{ width: progress + '%' }"></div>
      </div>
    </div> -->
    <!-- <div v-if="uploading"><progress-bar /></div> -->
    
    <div class="field">
      <button class="button is-info" :style="styleCursor">
        Send
      </button>
    </div>
    <div v-if="uploading"><progress-bar :progress="progress" :progress-bar-error="progressBarError"/></div>
  </form>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import ProgressBar from './ProgressBar.vue';

export default {
  components: { ProgressBar },
  name: "MultipleUploads",

  data() {
    return {
      uploadedFiles: [],
      message: "",
      error: false,
      uploading: false,
      allowedFileTypes: [
        "image/x-icon", 
        "image/gif", 
        "image/jpeg", 
        "image/png", 
        "image/svg+xml", 
        "image/tiff", 
        "image/webp",
        ""],
      maxFileSize: 3 * (1000 * 1024), // 1000 - 1KB, (1000*1024) => 1MB, 3*(1000*1024) => 3MB
      progress: 0,
      files: [],
      statusCode: 0,
      progressBarError: false
    };
  },

  methods: {
    selectFile() {
      this.files = this.$refs.uploadedFiles.files
      const files = this.$refs.uploadedFiles.files;
      this.uploadedFiles = [
        ...this.uploadedFiles,
        ..._.map(files, file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          invalidMessage: this.validate(file)
        }))
      ];
    },

    validate(file) {
      return this.validateFile(file);
    },

    validateFile(file) {
      var message = this.validateFileType(file);
      if (message == undefined) {
        message = this.validateFileSize(file);
      }

      return message;
    },

    validateFileType(file) {
      if (!this.allowedFileTypes.includes(file.type)) {
          return "File type is invalid. Please upload valid files.";
      }
    },

    validateFileSize(file) {
      if (file.size > this.maxFileSize) {
        return "The document exceeds its maximum permitted size of 3MB";
      }
    },

    startProgress() {
      setInterval(() => {
        if(this.progress < 90){
          this.progress += 1
        }
      }, 100)
    },

    stopProgress() {
      setInterval(() => {
        if(this.progress < 100 && this.statusCode != 500 && this.statusCode != 400){
          this.progress += 1
        }

        this.uploading = false;
        // this.statusCode = 0;

        console.log(this.statusCode)

        // if(this.statusCode == 500 || this.statusCode == 400) {
        //   console.log("in error")
        //   this.progress = 0;
        //   this.progressBarError = true;
        //   this.uploading = true;
        // }

        // this.uploading = false;

      }, 100)
    },

    async sendFile() {
      this.message = "";
      const formData = new FormData();
      // _.forEach(this.uploadedFiles, file => {
      //   // if (this.validate(file) === "") {
      //     formData.append("files", file);
      //   // }
      // });

      this.files.forEach(file => formData.append("files", file));

      try {
        this.uploading = true;
        // this.startProgress()
        const res = await axios.post("/file-upload-api/upload", formData, this.startProgress()
        // , {
        //   onUploadProgress: e =>
        //     (this.progress = Math.round((e.loaded  / e.total) * 100))
        // }
        );
        this.statusCode = res.status;
        this.stopProgress()
        this.uploadedFiles.push(res.data.file);
        // this.uploading = false;
        this.message = "Files has been uploaded";
        this.files = [];
        this.uploadedFiles = [];
        this.progress = 0;
        
      } catch (err) {
        this.message = err.response.data.message;
        this.statusCode = err.response.status;
        this.stopProgress()
        this.error = true;
        // this.uploading = false;
      }

    }
  },

  computed: {
    percent() {
      return this.progress.toFixed(2)
    },
    styleCursor() {
      return this.uploading ? { cursor: 'not-allowed' } : { cursor: 'pointer' };
    },
    opacity() {
      return this.uploading ? { opacity: '0.5' } : { opacity: '1' };
    },
  },
};
</script>

<style scoped>
.field {
  overflow-wrap: break-word;
  color: #fff;
}

.invalid-file {
  /* overflow-wrap: break-word; */
  color: #fff;
  padding: 0px 10px 10px 10px;
  max-width: 120px;
  margin: 10px;
  width: 100%;
}

.invalid-file-msg {
  overflow-wrap: break-word;
  /* color: #fff; */
  /* padding: 0px 10px 10px 10px; */
  max-width: 200px;
  margin: 10px;
  width: 100%;
}

.level-item {
    align-items: flex-start
}

form {
  padding: 10px;
}

.uploaded-files, .progress-bar{
  /* max-height: 450px; */
    max-height: 50vh;
max-width: 100vh;
  overflow: auto;
  position: relative;
}

.progress-bar {
   position: absolute;
    left: 0;
    top: 0;
}
/* .level .has-text-danger {
  margin: 10px;
} */

.delete {
  margin: 20px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(59, 136, 136); 
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0080b3; 
}
</style>
