const formTypes = document.getElementsByClassName('form-type');
const formPage = document.getElementById("form-page");
const breadcrumb = document.getElementById("breadcrumb");
const breadcrumbPage = document.getElementById("breadcrumb-page");
const title = document.getElementById("form-page-head")
const formTypeCont = document.getElementsByClassName("form-type-cont")[0];
const backForms = document.getElementById("back-forms");
const formsWrap = document.getElementById("forms-wrap");

function toFiles(ele){
    const id = ele.id;
    const idCapital = id.substring(0, 1).toUpperCase() + id.substring(1);
    const name = ele.name;
    formTypeCont.classList += " hide";
    formPage.classList += " show";
    breadcrumbPage.innerHTML = " > " + idCapital;
    backForms.classList += "linky";
    title.textContent = idCapital + " Forms";
    showForms(ele);
}

function back(){
    formPage.classList.remove("show");
    formTypeCont.classList.remove("hide");
    breadcrumbPage.innerHTML = "";
    backForms.classList.remove("linky")
}

function showForms(ele){
    const id = ele.id;
    if(id === "fishing"){
        for(let i = 0; i < 4; i++){
            let formPreview = document.createElement('div');
            formPreview.classList += "form-preview";
            let download = document.createElement('a');
            download.classList += "download linky";
            formPreview.append(download);
            formsWrap.append(formPreview);
            download.textContent = "Download Fishing Form " + (i+1);
        }

        const eles = document.getElementsByClassName('download');
        for(let i = 0; i < eles.length; i++){
            let path = "../forms/fishing/fishing" + toString(i+1) + ".pdf"
            let name = 'fishing form ' + (i+1);
            eles[i].onclick = function(){
                download(path, name)
            }
        }

    }
}

function formDown(a, b){
    download(a, b);
}