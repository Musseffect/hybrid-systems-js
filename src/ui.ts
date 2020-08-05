import {examples} from "./examples";
import $ from "jquery";
//tabs init
export const ui = {
    isResultsTab:false,
    init:function(){
        $('*[data-role="tab"]').click(
        function(e){
            ui.openTab($(e.target).data("tab"));
            /*let target = $(e.target);
            let parentId = target.data("parent");
            let parent=$('#'+parentId);
            let tabId = target.data("tab");
            $('[data-role="tab-item"][data-parent="'+parentId+'"').removeClass("show");
            $('[data-role="tab"][data-parent="'+parentId+'"').removeClass("active");
            target.addClass("active");
            $('#'+tabId).addClass("show");*/
        });
        let examplesContainer = $('#examples-dae');
        Object.entries(examples.dae).forEach(function([key,value]){
            examplesContainer.append(`<button id="${key}" class="example-button dae button">${value.name}</button`)
        })
        examplesContainer = $('#examples-hybrid');
        Object.entries(examples.hybrid).forEach(function([key,value]){
            examplesContainer.append(`<button id="${key}" class="example-button hybrid button">${value.name}</button`)
        })
        $('.example-button.dae').click(function(this,e){
            ui.loadDaeExample(this.id);
        });
        $('.example-button.hybrid').click(function(this,e){
            ui.loadHybridExample(this.id);
        });
        let stepControl = $('#step-control');
        let stepSolver = $('#step-solver');
        let systemSolver = $('#system-solver');
        let adaptive = $('#adaptive');
        let zeroCrossing = $('#zero-crossing');
        let pointsSimplification = $('#points-simplification');
        let adaptiveGamma = $('#adaptive-gamma');
        let adaptiveMinStep = $('#adaptive-min-step');
        let zeroCrossingNewtonIterations = $('#newton-iterations-zero-crossing');
        let zeroCrossingNewtonAlphha = $('#alpha-zero-crossing');
        let zeroCrossingAbsTol = $('#abs-tol-zero-crossing');
        let zeroCrossingRelTol = $('#rel-tol-zero-crossing');
        let zeroCrossingBisectionIterations = $('#bisection-iterations-zero-crossing');
        let zeroCrossingTimeResAbsTol = $('#time-abs-tol-zero-crossing');
        let zeroCrossingTimeResRelTol = $('#time-rel-tol-zero-crossing');
        let pointsReductionMethod = $('#points-reduction-method');
        let pointsMaxNumber = $('#points-max-number');
        $('#dae-form').change(function(this){
            if($(this).val()=="explicit")
                systemSolver.attr("disabled","disabled");
            else
                systemSolver.attr("disabled",null);
        });
        $('#dae-form').trigger("change");
        let methods:Record<string,{autostep:boolean,implicitStep:boolean}> = {
            edopri5:{autostep:true,implicitStep:false},
            ieuler:{autostep:false,implicitStep:true},
            imidpoint:{autostep:false,implicitStep:true},
            itrapezoidal:{autostep:false,implicitStep:true},
            eeuler:{autostep:false,implicitStep:false},
            emidpoint:{autostep:false,implicitStep:false},
            etrapezoidal:{autostep:false,implicitStep:false},
            erk4:{autostep:false,implicitStep:false},
            "erk4-2":{autostep:false,implicitStep:false},
            "erk4-ralston":{autostep:false,implicitStep:false},
            "ebs23":{autostep:true,implicitStep:false}
        };

        $('#method').change(function(this){
            if(methods[$(this).val() as string].autostep==true)
                stepControl.attr("disabled",null);
            else
                stepControl.attr("disabled","disabled");
            if(methods[$(this).val() as string].implicitStep==true)
                stepSolver.attr("disabled",null);
            else
                stepSolver.attr("disabled","disabled");
        });
        $('#method').trigger("change");
        $('#adaptive-step').change(function(this){
            if($(this).prop("checked")){
                adaptive.attr("disabled",null);
            }
            else{
                adaptive.attr("disabled","disabled");
            }

        });
        $('#adaptive-step').trigger("change");
        $('#zero-crossing-detection').change(function(this){
            if($(this).prop("checked")){
                zeroCrossing.attr("disabled",null);
            }
            else{
                zeroCrossing.attr("disabled","disabled");
            }
        });
        $('#zero-crossing-detection').trigger("change");
        $('#points-reduction').change(function(this){
            if($(this).prop("checked")){
                pointsSimplification.attr("disabled",null);
            }
            else{
                pointsSimplification.attr("disabled","disabled");
            }
        });
        $('#points-reduction').trigger("change");
    },
    openTab:function(tabId:string){
        let target = $('[data-role="tab"][data-tab="'+tabId+'"]');
        let parentId = target.data("parent");
        let parent=$('#'+parentId);
        $('[data-role="tab-item"][data-parent="'+parentId+'"').removeClass("show");
        $('[data-role="tab"][data-parent="'+parentId+'"').removeClass("active");
        target.addClass("active");
        $('#'+tabId).addClass("show");
        if(tabId=="results"){
            ui.isResultsTab = true;
            //@ts-ignore
          Plotly.relayout('plot-area',{
            width:$("#plot-area").width(),
            height:$("#plot-area").height()
          })
        }else{
            ui.isResultsTab = false;
        }
    },
    loadDaeExample:function(exampleId:string){
        $('#text-input').val(examples.dae[exampleId].text);
    },
    loadHybridExample:function(exampleId:string){
        $('#text-input').val(examples.hybrid[exampleId].text);
    },
    clearLog:function(){
        $('#log-area').empty();
    },
    addLogMessage:function(message:string){
        let logArea =  $('#log-area');
        let childs = logArea.children();
        let i=0;
        while(childs.length>15+i){
            childs[i].remove();
            i++;
        }
        let date = new Date();
        const ss = String(date.getSeconds()+1).padStart(2,'0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mm = String(date.getMinutes()).padStart(2, '0');
        logArea.append(`<div class="log-message">[${hh}:${mm}:${ss}]: ${message}</div>`);var mydiv = $("#scroll");
        logArea.scrollTop(logArea.prop("scrollHeight"));
    },
    registerMethods:function(methods:{explicit:{id:string,name:string}[],implicit:{id:string,name:string}[]}){

        let explicit = $("#methods").append('<optgroup label="Explicit methods"></optgroup>');
        methods.explicit.forEach(function(item){
            explicit.append(`<option value="${item.id}">${item.name}</option>`);
        });
        let implicit = $("#methods").append('<optgroup label="Implicit methods"></optgroup>');
        methods.implicit.forEach(function(item){
            implicit.append(`<option value="${item.id}">${item.name}</option>`);
        });
    }

}