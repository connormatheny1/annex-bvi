$(document).ready(function(){
    let config = {
        name: '',
        start: '',
        end: '',
    }
    let currentStep = 1
    $("#step-1").css("display", "flex")
    $("#button-addon2").on("click", (e) => {
        e.preventDefault()
        if($("#last-name-field").val() != ""){
            let s = $("#last-name-field").val()
            let cs = s.trim().replace(/ /g, "")
            config.name = cs
            nextStep(currentStep)
        }
        else{
            $(".invalid-feedback").css("display", "block")
        }
    })
    
    $("#2-next").on("click", (e) => {
        e.preventDefault()
        let valid = validateDates()
        let endString;
        let startString;
        if(!valid.status){
            return console.log(valid.error)
        }
        if(valid.status && valid.admin){
            config.start = 'admin'
            config.end = 'admin'
            return nextStep(currentStep)
        }
        startString = parseDates(true, valid.start)
        endString = parseDates(false, valid.end)
        config.start = startString
        config.end = endString
        console.log(config)
        nextStep(currentStep)
    })

    $("#2-prev").on("click", (e) => {
        e.preventDefault()
        prevStep(currentStep)
        console.log(config)
    })

    function nextStep(cur) {
        if(cur === 2){
            populateCompleted();
            $("#completed").css("display", "flex")
            $(`#step-${cur}`).css("display", "none")
        }
        else if(cur === 1 ){
            $(`#step-${cur + 1}`).css("display", "flex")
            $(`#step-${cur}`).css("display", "none")
            currentStep += 1
        } 
    }

    function prevStep(cur){
        $(`#step-${cur - 1}`).css("display", "flex")
        $(`#step-${cur}`).css("display", "none")
        currentStep -= 1
    }

    function populateCompleted(){
        if(!config.start || !config.end || !config.name){
            return console.log("config value(s) somehow null")
        }
        $("#rf0").html(`<b>Name:</b> ${config.name}`)
        $("#rf1").html(`<b>Trip start:</b> ${config.start}`)
        $("#rf2").html(`<b>Trip end:</b> ${config.end}`)
    }

    $("#download-pdf").on("click", (e) => {
        e.preventDefault()
    })

    function validateDates(){
        const sm = $("#start-date-m"), 
            sd = $("#start-date-d"), 
            sy = $("#start-date-y"), 
            em = $("#end-date-m"), 
            ed = $("#end-date-d"), 
            ey = $("#end-date-y");
        const smv = sm.val(),
            sdv= sd.val(),
            syv= sy.val(),
            edv= ed.val(),
            emv= em.val(),
            eyv= ey.val();
        
        if(smv === "ad"){
            return {status: true, admin: true}
        }
        
        if( !$.isNumeric(smv) || !$.isNumeric(sdv) || !$.isNumeric(syv) || !$.isNumeric(edv) || !$.isNumeric(emv) || !$.isNumeric(eyv) ){
            return { status: false, error: `Fields either not all filled or contained non integer values, ${smv}, ${sdv}, ${syv}, ${emv}, ${edv}, ${syv}` }
        }

        if(smv < 1 || smv > 12 || emv < 1 || emv > 12){
            return { status: false, error: "Month dates out of range [1, 12]" }
        }

        if(parseInt(syv) < 2020 || parseInt(eyv) < 2020 || parseInt(syv) > parseInt(eyv) || parseInt(eyv) > parseInt(syv)){
            return { status: false, error: `years, ${syv}, ${eyv}, ${parseInt(syv)}, ${parseInt(eyv)}`}
        }

        if(sdv < 1 || edv < 1){
            return { status: false, error: "days must be above 1"}
        }

        if(smv == "02" || emv == "02"){
            if(sdv > 28 || edv > 28){
                return { status: false, error: "days out of range [1,28]"}
            }
        }
        else if(smv == "01" || smv == "03" || smv == "05" || smv == "07" || smv == "08" || smv == "10" || smv == "12" || emv == "01" || emv == "03" || emv == "05" || emv == "07" || emv == "08" || emv == "10" || emv == "12"){
            if(sdv > 31 || edv > 31){
                return { status: false, error: "days out of range [1,31]"}
            }
        }
        else{
            if(sdv > 30 || edv > 30){
                return { status: false, error: "days out of range [1,30]"}
            }
        }

        return { status: true, start: { smv, sdv, syv }, end: { emv, edv, eyv }  }  
    }

    function parseDates(start, data){
        let retVal;
        if(start){
            const { smv, sdv, syv } = data
            retVal = `${smv}-${sdv}-${syv}`;
        }
        else{
            const { emv, edv, eyv } = data
            retVal = `${emv}-${edv}-${eyv}`;
        }
        return retVal
    }
})







//const formTypes = document.getElementsByClassName('form-type');
    // const formPage = document.getElementById("form-page");
    // const breadcrumb = document.getElementById("breadcrumb");
    // const breadcrumbPage = document.getElementById("breadcrumb-page");
    // const title = document.getElementById("form-page-head")
    // const formTypeCont = document.getElementsByClassName("form-type-cont")[0];
    // const backForms = document.getElementById("back-forms");
    // const formsWrap = document.getElementById("forms-wrap");

    // function toFiles(ele){
    //     const id = ele.id;
    //     const idCapital = id.substring(0, 1).toUpperCase() + id.substring(1);
    //     const name = ele.name;
    //     formTypeCont.classList += " hide";
    //     formPage.classList += " show";
    //     breadcrumbPage.innerHTML = " > " + idCapital;
    //     backForms.classList += "linky";
    //     title.textContent = idCapital + " Forms";
    //     showForms(ele);
    // }

    // function back(){
    //     formPage.classList.remove("show");
    //     formTypeCont.classList.remove("hide");
    //     breadcrumbPage.innerHTML = "";
    //     backForms.classList.remove("linky")
    // }

    // function showForms(ele){
    //     const id = ele.id;
    //     if(id === "fishing"){
    //         for(let i = 0; i < 4; i++){
    //             let formPreview = document.createElement('div');
    //             formPreview.classList += "form-preview";
    //             let download = document.createElement('a');
    //             download.classList += "download linky";
    //             formPreview.append(download);
    //             formsWrap.append(formPreview);
    //             download.textContent = "Download Fishing Form " + (i+1);
    //         }

    //         const eles = document.getElementsByClassName('download');
    //         for(let i = 0; i < eles.length; i++){
    //             let path = "../forms/fishing/fishing" + toString(i+1) + ".pdf"
    //             let name = 'fishing form ' + (i+1);
    //             eles[i].onclick = function(){
    //                 download(path, name)
    //             }
    //         }

    //     }
    // }

    // function formDown(a, b){
    //     download(a, b);
    // }