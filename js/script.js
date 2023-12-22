var siteName = document.getElementById('siteName');
var siteUrl = document.getElementById('siteUrl');
var dataList ;


// Check About Data In Localstorage
if(localStorage.getItem('dataList')===null){
    // not data founded
    var dataList =[]
    }else{
    //is data founded do this
    dataList=JSON.parse(localStorage.getItem('dataList'));
    // display data
    displayData(dataList)
}
// End




// Global_Function To CreatData
function creatData(){
    if(validateSitName()===true && validateSitUrl()===true){
        var newUrl = siteUrl.value.trim();
        var urlExists = dataList.some(item => item.url === newUrl);
        // check if url already exists 
        if (!urlExists) {
            var userData = {
                name: siteName.value,
                url: newUrl
            };
        dataList.push(userData)
        displayData(dataList)
        localStorage.setItem('dataList',JSON.stringify(dataList))
        clearForm()

        // if not exists
        } else {
            Swal.fire("URL Already Exists!");
        }
    }
}
// End



// Function To DisplayData To UI
function displayData(list) {
    cartona=''
    for(var i=0 ; i<list.length ; i++){
        cartona+=
        `<tr>
            <td>${i+1}</td>
            <td>${list[i].name}</td>
            <td>
            <button class="visit" onclick="openURL('${list[i].url}')">
            <span>
             visit 
              <i class="fas fa-eye"></i>            </span>
            <span>
              Sure ?
            </span>
            <span>
              Done ! 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M8.00011 13L12.2278 16.3821C12.6557 16.7245 13.2794 16.6586 13.6264 16.2345L22.0001 6"></path> <path fill="#ffffff" d="M11.1892 12.2368L15.774 6.63327C16.1237 6.20582 16.0607 5.5758 15.6332 5.22607C15.2058 4.87635 14.5758 4.93935 14.226 5.36679L9.65273 10.9564L11.1892 12.2368ZM8.02292 16.1068L6.48641 14.8263L5.83309 15.6248L2.6 13.2C2.15817 12.8687 1.53137 12.9582 1.2 13.4C0.868627 13.8419 0.95817 14.4687 1.4 14.8L4.63309 17.2248C5.49047 17.8679 6.70234 17.7208 7.381 16.8913L8.02292 16.1068Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
            </span>
          </button>
            </td>

            <td>
            <button class="bin-button" onclick="deleteData(${i})"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" class="bin-top">
              <line stroke-width="4" stroke="white" y2="5" x2="39" y1="5"></line>
              <line stroke-width="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" class="bin-bottom">
              <mask fill="white" id="path-1-inside-1_8_19">
                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
              </mask>
              <path mask="url(#path-1-inside-1_8_19)" fill="white" d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
              <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
              <path stroke-width="4" stroke="white" d="M21 6V29"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" class="garbage">
              <path fill="white" d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"></path>
            </svg>
          </button>
          </td>
        </tr>`
    }
    document.getElementById('tableContent').innerHTML=cartona
}
// End




// Function To DeleteData 
function deleteData(index){
    dataList.splice(index,1);
    displayData(dataList);
    localStorage.setItem('dataList',JSON.stringify(dataList))
}
// End



// Function To Clear Form
function clearForm(){
    siteName.value=''
    siteUrl.value=''
}
// End


// Function To Search In DataList
function searchData(letter){
    var foundedData=[];
    var found = false;
    for(var i=0 ; i<dataList.length ; i++){
        if(dataList[i].name.toLowerCase().includes(letter.toLowerCase())){
            foundedData.push(dataList[i]);
            found=true;
            }
        }
        if (found) {
            displayData(foundedData);
        }else{
            Swal.fire({
                title: "Data Not Founded!",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
        }
}
// End
  


// Function To Open Url In New Tab
  function openURL(url) {
    window.open(url, '_blank');
  }
// End


// Function To Validate SiteName
function validateSitName(){
    var regex=/^[A-Z][a-z]{3,8}$/;
    if(regex.test(siteName.value)){
        siteName.classList.replace("is-invalid","is-valid");
        document.getElementById("nameError").classList.replace("d-block", "d-none");
        return true
    }else{
        siteName.classList.add("is-invalid");
        document.getElementById("nameError").classList.replace("d-none", "d-block");
        return false
    }
}
// End


// Function To Validate SiteUrl
function validateSitUrl(){
    // var urlregex=/^(ftp|http|https):\/\/[^ "]+\.com(?:\/[^ "]+)*$/;
    var urlregex= /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    if(urlregex.test(siteUrl.value)){
        siteUrl.classList.replace("is-invalid","is-valid");
        document.getElementById("urlError").classList.replace("d-block", "d-none");
        return true
    }else{
        siteUrl.classList.add("is-invalid");
        document.getElementById("urlError").classList.replace("d-none", "d-block");
        return false
    }
  }
// End

