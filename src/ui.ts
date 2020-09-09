import {examples} from "./examples";
import $ from "jquery";
import { DAEVector } from "./dae/daeVector";
import ErrorMessage from "./compiler/error";
import { Test } from "./test/test";
import { EDAEHybridSolver} from "./dae/edaeHybridSolver";
import { IDAEHybridSolver } from "./dae/idaeHybridSolver";
import { HybridSystemCompiler } from "./compiler/hybridCompiler";
import { CompilerError } from "./compiler/compilerError";
import { EventDetectionSimple,EventDetectionComplex, EventDetection } from "./dae/eventDetection";
import { AdaptiveStepStrategy } from "./dae/adaptiveStep";
import { EDAESolver } from "./dae/edaeSolver";
import { IDAESolver } from "./dae/idaeSolver";
import { HybridSolution } from "./dae/hybridSolution";
import { TextPosition } from "./compiler/astNode";
import { methods, UIParameters } from "./methods";



//tabs init
export const ui = {
    isResultsTab:false,
    methods:methods,
    showDebug:function(){
        $("#debug").css("display","block");
    },
    hideDebug:function(){
        $("#debug").css("display","none");
    },
    init:function(){
        //init debug
        $("#debug").append('<button class="button" id="debug-hide">Hide</button>');
        $("#debug-hide").click(ui.hideDebug);
        $("#debug").append('<button class="button" id="edae-test">Test EDAE</button>');
        $("#debug").append('<button class="button" id="idae-test">Test IDAE</button>');
        $("#debug").append('<button class="button" id="e-hybrid-test">Test Explicit Hybrid</button>');
        $("#debug").append('<button class="button" id="i-hybrid-test">Test Implicit Hybrid</button>');
        $('#edae-test').click(Test.testEDAECompiler);
        $('#idae-test').click(Test.testIDAECompiler);
        $('#e-hybrid-test').click(Test.testExplicitHybridCompiler);
        $('#i-hybrid-test').click(Test.testImplicitHybridCompiler);

        $("#run-button").click(ui.run);
        $("#export-button").click(ui.run);
        $('*[data-role="tab"]').click(
        function(e){
            ui.openTab($(e.target).data("tab"));
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
        let simplification = $('#simplification');
        let adaptiveGamma = $('#adaptive-gamma');
        let adaptiveMinStep = $('#adaptive-min-step');
        let zeroCrossingNewtonIterations = $('#newton-iterations-zero-crossing');
        let zeroCrossingNewtonAlphha = $('#alpha-zero-crossing');
        let zeroCrossingAbsTol = $('#abs-tol-zero-crossing');
        let zeroCrossingRelTol = $('#rel-tol-zero-crossing');
        let zeroCrossingBisectionIterations = $('#bisection-iterations-zero-crossing');
        let zeroCrossingTimeResAbsTol = $('#time-abs-tol-zero-crossing');
        let zeroCrossingTimeResRelTol = $('#time-rel-tol-zero-crossing');
        let simplificationMethod = $('#simplification-method');
        let simplificationPointsLimit = $('#simplification-limit');
        $('#dae-form').change(function(this){
            if($(this).val()=="explicit")
                systemSolver.attr("disabled","disabled");
            else
                systemSolver.attr("disabled",null);
        });
        $('#dae-form').trigger("change");
        let explicitMethods = $("#explicitMethods");
        let implicitMethods = $("#implicitMethods");
        //init methods select element
        Object.entries(methods).forEach(function([key,item]){
            let el = `<option value="${key}">${item.name}</option>`;
            if(item.implicit){
                implicitMethods.append(el);
            }else{
                explicitMethods.append(el);
            }
        });
        $('#method').change(function(this){
            if(methods[$(this).val() as string].autostep==true)
                stepControl.attr("disabled",null);
            else
                stepControl.attr("disabled","disabled");
            if(methods[$(this).val() as string].implicit==true)
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
        $('#use-simplification').change(function(this){
            if($(this).prop("checked")){
                simplification.attr("disabled",null);
            }
            else{
                simplification.attr("disabled","disabled");
            }
        });
        $('#use-simplification').trigger("change");
    },
    getParameters:function():UIParameters{
        return {
            solver:{
                daeForm:$("#dae-form").val() as string,
                method:$("#method").val() as string,
                step:parseFloat($("#step").val() as string)*1e-3,
                t0:parseFloat($("#t0").val() as string),
                time:parseFloat($("#time").val() as string),
                stepControl:{
                    minStep:parseFloat($("#min-step").val() as string)*1e-3,
                    errTol:parseFloat($("#error-tolerance").val() as string)*1e-3
                },
                implicitStepSolver:{
                    iters:parseFloat($("#implicit-iterations").val() as string),
                    minIters:parseFloat($("#implicit-min-iterations").val() as string),
                    absTol:parseFloat($("#implicit-f-abs-tol").val() as string)*1e-3,
                    relTol:parseFloat($("#implicit-f-rel-tol").val() as string)*1e-3,
                    alpha:parseFloat($("#implicit-alpha").val() as string)
                },
                implicitSystemSolver:{
                    iters:parseFloat($("#idae-iterations").val() as string),
                    minIters:parseFloat($("#idae-min-iterations").val() as string),
                    absTol:parseFloat($("#idae-f-abs-tol").val() as string)*1e-3,
                    relTol:parseFloat($("#idae-f-rel-tol").val() as string)*1e-3,
                    alpha:parseFloat($("#idae-alpha").val() as string)
                },
            },
            eventDetection:{
                borderTol:parseFloat($("#zero-crossing-border-tol").val() as string)*1e-3,
                adaptiveStep:{
                    enabled:$("#adaptive-step").val()=="on",
                    gamma:parseFloat($("#adaptive-gamma").val() as string),
                    minStep:parseFloat($("#adaptive-min-step").val() as string)*1e-3,
                },
                zeroCrossing:{
                    enabled:$("#zero-crossing-detection").val()=="on",
                    newtonIters:parseInt($("#newton-iterations-zero-crossing").val() as string),
                    newtonAlpha:parseFloat($("#alpha-zero-crossing").val() as string),
                    absTol:parseFloat($("#abs-tol-zero-crossing").val() as string)*1e-3,
                    relTol:parseFloat($("#rel-tol-zero-crossing").val() as string)*1e-3,
                    bisectIters:parseInt($("#bisection-iterations-zero-crossing").val() as string),
                    timeAbsTol:parseFloat($("#time-abs-tol-zero-crossing").val() as string)*1e-3,
                    timeRelTol:parseFloat($("#time-rel-tol-zero-crossing").val() as string)*1e-3
                }
            },
            simplification:{
                enabled:$("#use-simplification").val()=="on",
                method:$("#simplification-method").val() as string,
                maxPoints:parseInt($("#simplification-limit").val() as string),
                tolerance:parseFloat($("#simplification-tolerance").val() as string)
            }
        };
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
    clearErrors:function(){
        $('#error-list').empty();
    },
    addErrorMessage:function(message:string,textPos:TextPosition){
        $('#error-list').append(`<div class="errors-row${textPos.line==-1?"":" clickable"}" data-line="${textPos.line}" data-column="${textPos.column}" data-start="${textPos.start}" data-stop="${textPos.stop}">
        <div class="errors-cell">${textPos.line==-1?"":textPos.line}</div>
        <div class="errors-cell">${textPos.line==-1?"":textPos.column}</div>
        <div class="errors-cell">${message}</div>
        </div>`);
        if(textPos.line!=-1)
            $('#error-list').children().last().click(ui.onClickErrorMessage);
    },
    setCursor(line:number,position:number){
        let elem = $("#text-input")[0] as HTMLTextAreaElement;
        let row = 1;
        let pos = 0;
        while(row<line){
            let lineEnd = elem.value.indexOf("\n",pos);
            if(lineEnd == -1){
                return;
            }
            row++;
            pos = lineEnd+1;
        }
        let lineEnd = elem.value.indexOf("\n",pos);
        lineEnd=(lineEnd==-1?elem.value.length:lineEnd);
        pos = Math.min(lineEnd,pos + position);
        elem.focus();
        elem.setSelectionRange(pos,pos+1);
    },
    onClickErrorMessage:function(this:HTMLElement){
        let line = parseInt($(this).data("line"));
        let column = parseInt($(this).data("column"));
        let start = parseInt($(this).data("start"));
        let stop = parseInt($(this).data("stop"));
        if(start == -1)
            ui.setCursor(line,column);
        else{
            let elem = $("#text-input")[0] as HTMLTextAreaElement;
            elem.focus();
            elem.setSelectionRange(start,stop);
        }
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
    },
    plotSolution:function(solution:HybridSolution,x:string[],z:string[]):void{
        let data:any = [];
        let t:number[] = [];
        let xTraces:any[] = [];
        let zTraces:any[] = [];
        data.push({x:t,y:[],type:"scattergl",mode:'markers+lines',name:"State",
        line: {shape: 'hv'},});
        x.forEach(function(item){
            xTraces.push({x:t,y:[],type:"scattergl",mode:'markers+lines',name:item});
        });
        z.forEach(function(item){
            zTraces.push({x:t,y:[],type:"scattergl",mode:'markers+lines',name:item});
        })
        solution.values.forEach(function(value,index){
            t.push(value.t);
            data[0].y.push(solution.states[index]);
            xTraces.forEach(function(item,id:number){
                item.y.push(value.x.get(id));
            });
            zTraces.forEach(function(item,id){
                item.y.push(value.z.get(id));
            });
        });
        xTraces.forEach(function(item){
            data.push(xTraces);
        });
        zTraces.forEach(function(item){
            data.push(zTraces);
        })
        //@ts-ignore
        Plotly.addTraces('plot-area', data);
    },
    plot:function(x:number[],t:number[],label:string):void{
        let data:any = [];
        let trace:any = {
            x: t,
            y: x,
            type:"scattergl",
            mode: 'markers+lines',
            name: label
        };
        data.push(trace);
        //@ts-ignore
        Plotly.addTraces('plot-area', data);
    },
    export:function():void{

    },
    run:function():void{
        Test.testSimplification();
        //Test.runTests();
        return;
        throw new Error("Not implemented");
        ui.clearErrors();
        let parameters = ui.getParameters();
        let text = $("#text-input").val() as string;
        try{
            let eventDetection:EventDetection;
            if(parameters.eventDetection.zeroCrossing.enabled){
                let params = parameters.eventDetection.zeroCrossing;
                eventDetection = new EventDetectionComplex(
                    params.newtonIters,
                    params.relTol,params.absTol,params.newtonAlpha,
                    params.bisectIters,params.timeAbsTol,params.timeRelTol);
            }else{
                eventDetection = new EventDetectionSimple();
            }
            let adaptiveStepStrategy:AdaptiveStepStrategy;
            if(parameters.eventDetection.adaptiveStep.enabled){

            }else{
                adaptiveStepStrategy = null;
            }
            let compiler = new HybridSystemCompiler();
            if(parameters.solver.daeForm == "explicit"){
                let sysDef = compiler.compileExplicit(text);
                let daeSolver:EDAESolver = methods[parameters.solver.method].edaeInit(parameters);
                let solver = new EDAEHybridSolver(eventDetection,adaptiveStepStrategy);
                let solution = solver.solve(sysDef.x0,parameters.solver.t0,parameters.solver.t0+parameters.solver.time,
                    daeSolver,sysDef.system);
                ui.plotSolution(solution,sysDef.x,sysDef.z); 
            }else{
                let sysDef = compiler.compileImplicit(text);
                let daeSolver:IDAESolver = methods[parameters.solver.method].idaeInit(parameters);
                let solver = new IDAEHybridSolver(eventDetection,adaptiveStepStrategy);
                let solution = solver.solve(sysDef.x0,sysDef.z0,parameters.solver.t0,parameters.solver.t0 + parameters.solver.time,
                    daeSolver,sysDef.system);
                ui.plotSolution(solution,sysDef.x,sysDef.z);
            }
        }catch(e){
            if(e instanceof CompilerError){
                e.messages.forEach(function(item:ErrorMessage){
                    ui.addErrorMessage(item.message,item.textPos);
                    console.log(item.print());
                });
            }else if(e instanceof Error){
                ui.addErrorMessage(e.message,TextPosition.invalid());
                ui.addLogMessage(e.message);
                console.log(e.message);
            }else{
                ui.addErrorMessage("Exception: "+e,TextPosition.invalid());
                ui.addLogMessage("Exception: "+e);
            }
            ui.openTab("main");
            ui.openTab("errors-tab");
        }
    }
}