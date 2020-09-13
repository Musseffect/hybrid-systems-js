import {examples} from "./examples";
import $ from "jquery";
import { DAEVector } from "./dae/daeVector";
import ErrorMessage from "./compiler/error";
import { EDAEHybridSolver} from "./dae/edaeHybridSolver";
import { IDAEHybridSolver } from "./dae/idaeHybridSolver";
import { HybridSystemCompiler } from "./compiler/hybridCompiler";
import { CompilerError } from "./compiler/compilerError";
import { EventDetectionSimple,EventDetectionComplex, EventDetection } from "./dae/eventDetection";
import { AdaptiveStepNewton, AdaptiveStepStrategy } from "./dae/adaptiveStep";
import { EDAESolver } from "./dae/edaeSolver";
import { IDAESolver } from "./dae/idaeSolver";
import { HybridSolution } from "./dae/hybridSolution";
import { TextPosition } from "./compiler/astNode";
import { methods } from "./daeMethods";
import { UIParameters } from "./UIParameters";
import { testSimplification } from "./test/testSimplification";
import { testExpression, testSymbolicDerivative } from "./test/testExpression";
import { testEquations } from "./test/testEquations";
import { simpMethods } from "./simplificationMethods";
import { ISimplificationAlgorithm } from "./curveSimplification/ISimplificationAlgorithm";
import { Test } from "./test/test";

var Ace = require('ace-builds/src-noconflict/ace');
var Mode  = require('./editor/mode').Mode;
var _Range = Ace.require("ace/range").Range;
require("ace-builds/src-noconflict/ext-language_tools");
var editor = Ace.edit("editor");

var theme = require('ace-builds/src-noconflict/theme-monokai');
editor.setTheme(theme);
editor.session.setMode(new Mode());
editor.setOption("enableBasicAutocompletion", true);


export function handleErrors(e:any){
    if(e instanceof CompilerError){
        e.messages.forEach(function(item){
            ui.addLogMessage(item.print());
            ui.addErrorMessage(item.message,item.textPos);
            console.log(item.print());
        });
    }else if(e instanceof Error){
        ui.addLogMessage(e.message);
        ui.addErrorMessage(e.message,TextPosition.invalid());
        console.log(e.message);
    }else{
        ui.addLogMessage("Exception: "+e);
        ui.addErrorMessage("Exception: "+e,TextPosition.invalid());
    }
}

//tabs init
export const ui = {
    isResultsTab:false,
    methods:methods,
    initPlot:function(){
        var layout = {
            title:'Result',
            type:"scattergl",
            width:$("#plot-area").width(),
            height:$("#plot-area").height(),
            paper_bgcolor: 'rgba(245,245,245,1)',
            plot_bgcolor: 'rgba(245,245,245,1)',
            nticks:30
          };
          //@ts-ignore
          Plotly.newPlot('plot-area',[],layout,{responsive:true});
    },
    showDebug:function(){
        $("#debug").css("display","block");
    },
    hideDebug:function(){
        $("#debug").css("display","none");
    },
    init:function(){
        editor.setValue(
`//stiff equation
const x0 = 0;
const a = -21;
const c1 = x0 + 1/(a + 1);

x' = a*x+exp(-t);
z = c1 * exp(a*t) - exp(-t)/(a+1);//analytical solution
x(t0) = x0;`);
        editor.selection.setSelectionRange(new _Range(0,0,0,0));
        //init debug
        $("#debug").append('<button class="button" id="debug-hide">Hide</button>');
        $("#debug-hide").on("click",ui.hideDebug);
        $("#debug").append('<button class="button" id="simplification-test">Test simplification</button>');
        $("#debug").append('<button class="button" id="simplification-eq">Test equations</button>');
        $("#debug").append('<button class="button" id="simplification-exp">Test expression</button>');
        $("#debug").append('<button class="button" id="simplification-der">Test symbolic derivative</button>');
        $("#debug").append('<button class="button" id="edae-test">Test EDAE</button>');
        $("#debug").append('<button class="button" id="idae-test">Test IDAE</button>');
        $("#debug").append('<button class="button" id="e-hybrid-test">Test Explicit Hybrid</button>');
        $("#debug").append('<button class="button" id="i-hybrid-test">Test Implicit Hybrid</button>');
        
        $('#simplification-test').on("click",testSimplification);
        $('#simplification-eq').on("click",testEquations);
        $('#simplification-exp').on("click",testExpression);
        $('#simplification-der').on("click",testSymbolicDerivative);
        $('#edae-test').on("click",Test.testEDAECompiler);
        $('#idae-test').on("click",Test.testIDAECompiler);
        $('#e-hybrid-test').on("click",Test.testExplicitHybridCompiler);
        $('#i-hybrid-test').on("click",Test.testImplicitHybridCompiler);

        $("#run-button").on("click",ui.run);
        $("#export-button").on("click",ui.run);
        $('*[data-role="tab"]').on("click",
        function(e){
            ui.openTab($(e.target).data("tab"));
        });
        let examplesContainer = $('#examples-dae');
        Object.entries(examples.dae).forEach(function([key,value]){
            examplesContainer.append(`<div><button data-key="${key}" class="example-button dae button">${value.name}</button>
            </div>`)
        })
        examplesContainer = $('#examples-hybrid');
        Object.entries(examples.hybrid).forEach(function([key,value]){
            examplesContainer.append(`<div><button data-key="${key}" class="example-button hybrid button">${value.name}</button>
            </div>`)
        })
        $('.example-button.dae').on("click",function(this,e){
            ui.loadDaeExample($(this).data("key"));
        });
        $('.example-button.hybrid').on("click",function(this,e){
            ui.loadHybridExample($(this).data("key"));
        });
        let stepControl = $('#step-control');
        let stepSolver = $('#step-solver');
        let systemSolver = $('#system-solver');
        let adaptive = $('#adaptive-step-params');
        let zeroCrossing = $('#zero-crossing-params');
        let simplification = $('#simplification-params');
        let simplificationMethod = $('#simp-method');
        let maxPointsParam = $('#simp-max-points-param');
        let tolParam = $('#simp-tol-param');
        let lookaheadParam = $('#simp-look-ahead-param');
        let simpMaxTol = $('#simp-max-tol-param');
        let nthPointParam = $('#simp-nth-point');
        $('#dae-form').on("change",function(this){
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
        $('#dae-method').on("change",function(this){
            if(methods[$(this).val() as string].autostep==true)
                stepControl.attr("disabled",null);
            else
                stepControl.attr("disabled","disabled");
            if(methods[$(this).val() as string].implicit==true)
                stepSolver.attr("disabled",null);
            else
                stepSolver.attr("disabled","disabled");
        });
        $("#dae-method").val(Object.keys(methods)[0]).trigger("change");
        $('#adaptive-step').on("change",function(this){
            if($(this).prop("checked")){
                adaptive.attr("disabled",null);
            }
            else{
                adaptive.attr("disabled","disabled");
            }

        });
        $('#adaptive-step').trigger("change");
        $('#zero-crossing').on("change",function(this){
            if($(this).prop("checked")){
                zeroCrossing.attr("disabled",null);
            }
            else{
                zeroCrossing.attr("disabled","disabled");
            }
        });
        $('#zero-crossing').trigger("change");
        $('#simplification').on("change",function(this){
            if($(this).prop("checked")){
                simplification.attr("disabled",null);
            }
            else{
                simplification.attr("disabled","disabled");
            }
        });
        $('#simplification').trigger("change");
        $('#simp-method').on("change",function(this){
            lookaheadParam.attr("disabled","disabled");
            maxPointsParam.attr("disabled","disabled");
            simpMaxTol.attr("disabled","disabled");
            nthPointParam.attr("disabled","disabled");
            tolParam.attr("disabled","disabled");
            switch($(this).val()){
                case "lang":
                    lookaheadParam.attr("disabled",null);
                    break;
                case "nth-point":
                    nthPointParam.attr("disabled",null);
                    break;
                case "opheim":
                    simpMaxTol.attr("disabled",null);
                case "reumann":
                case "douglas-peucker":
                case "radial-distance":
                case "perp-distance":
                    tolParam.attr("disabled",null);
                    break;
                case "douglas-peucker-n":
                    maxPointsParam.attr("disabled",null);
                case "max-points":
                    maxPointsParam.attr("disabled",null);
                    break;
            }
        });
        $('#simp-method').trigger("change");
    },
    getParameters:function():UIParameters{
        return {
            "dae-form":$("#dae-form").val() as string,
            "dae-method":$("#dae-method").val() as string,
            "step":parseFloat($("#step").val() as string)*1e-3,
            "t0":parseFloat($("#t0").val() as string),
            "time":parseFloat($("#time").val() as string),
            "min-step":parseFloat($("#min-step").val() as string)*1e-3,
            "step-err-tol":parseFloat($("#step-err-tol").val() as string)*1e-3,
            "step-solver-iters":parseFloat($("#step-solver-iters").val() as string),
            "step-solver-min-iters":parseFloat($("#step-solver-min-iters").val() as string),
            "step-solver-abs-tol":parseFloat($("#step-solver-abs-tol").val() as string)*1e-3,
            "step-solver-rel-tol":parseFloat($("#step-solver-rel-tol").val() as string)*1e-3,
            "step-solver-alpha":parseFloat($("#step-solver-alpha").val() as string),
            "sys-solver-iters":parseFloat($("#sys-solver-iters").val() as string),
            "sys-solver-min-iters":parseFloat($("#sys-solver-min-iters").val() as string),
            "sys-solver-abs-tol":parseFloat($("#sys-solver-abs-tol").val() as string)*1e-3,
            "sys-solver-rel-tol":parseFloat($("#sys-solver-rel-tol").val() as string)*1e-3,
            "sys-solver-alpha":parseFloat($("#sys-solver-alpha").val() as string),
            "zc-border-tol":parseFloat($("#zc-border-tol").val() as string)*1e-3,
            "adaptive-step":$("#adaptive-step").prop("checked"),
            "adaptive-min-step":parseFloat($("#adaptive-min-step").val() as string)*1e-3,
            "adaptive-step-gamma":parseFloat($("#adaptive-step-gamma").val() as string),
            "zero-crossing":$("#zero-crossing").prop("checked"),
            "zc-newton-iters":parseInt($("#zc-newton-iters").val() as string),
            "zc-newton-alpha":parseFloat($("#zc-newton-alpha").val() as string),
            "zc-abs-tol":parseFloat($("#zc-abs-tol").val() as string)*1e-3,
            "zc-rel-tol":parseFloat($("#zc-rel-tol").val() as string)*1e-3,
            "zc-bisect-iters":parseInt($("#zc-bisect-iters").val() as string),
            "zc-time-abs-tol":parseFloat($("#zc-time-abs-tol").val() as string)*1e-3,
            "zc-time-rel-tol":parseFloat($("#zc-time-rel-tol").val() as string)*1e-3,
            "simplification":$("#simplification").prop("checked"),
            "simp-method":$("#simp-method").val() as string,
            "simp-max-points":parseInt($("#simp-max-points").val() as string),
            "simp-tol":parseFloat($("#simp-tol").val() as string)*1e-3,
            "simp-look-ahead":parseFloat($("#simp-look-ahead").val() as string)*1e-3,
            "simp-nth-point":parseInt($("#simp-nth-point").val() as string),
            "simp-max-tol":parseInt($("#simp-max-tol").val() as string)*1e-3
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
    setParameters(parameters:Record<string,any>){
        Object.entries(parameters).forEach(function([key,entry]){
            if(typeof entry === "boolean"){
                $(`#${key}`).prop("checked",entry==true?"checked":null).trigger("change");
                //$(`#${key}`).val(entry==true?"on":"off").trigger("change");
            }else
                $(`#${key}`).val(entry).trigger("change");
        });
    },
    loadDaeExample:function(exampleId:string){
        let example = examples.dae[exampleId];
        editor.setValue(example.model);
        ui.setParameters(example.parameters);
        editor.selection.setSelectionRange(new _Range(0,0,0,0));
        //$('#text-input').val(examples.dae[exampleId].text);
    },
    loadHybridExample:function(exampleId:string){
        let example = examples.hybrid[exampleId];
        editor.setValue(example.model);
        ui.setParameters(example.parameters);
        editor.selection.setSelectionRange(new _Range(0,0,0,0));
        //$('#text-input').val(examples.hybrid[exampleId].text);
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
            $('#error-list').children().last().on("click",ui.onClickErrorMessage);
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
        let line = parseInt($(this).data("line"))-1;
        let column = parseInt($(this).data("column"));
        let start = parseInt($(this).data("start"));
        let stop = parseInt($(this).data("stop"));
        editor.selection.setSelectionRange(new _Range(line,column,line,column+(stop-start)));
        /*if(start == -1){
            ui.setCursor(line,column);
        }else{
            let elem = $("#text-input")[0] as HTMLTextAreaElement;
            elem.focus();
            elem.setSelectionRange(start,stop);
        }*/
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
        logArea.append(`<div class="log-message">[${hh}:${mm}:${ss}]: ${message}</div>`);
        var mydiv = $("#scroll");
        logArea.scrollTop(logArea.prop("scrollHeight"));
    },
    registerMethods:function(methods:{explicit:{id:string,name:string}[],implicit:{id:string,name:string}[]}){

        let explicit = $("#dae-method").append('<optgroup label="Explicit methods"></optgroup>');
        methods.explicit.forEach(function(item){
            explicit.append(`<option value="${item.id}">${item.name}</option>`);
        });
        let implicit = $("#dae-method").append('<optgroup label="Implicit methods"></optgroup>');
        methods.implicit.forEach(function(item){
            implicit.append(`<option value="${item.id}">${item.name}</option>`);
        });
    },
    plotSolution:function(solution:HybridSolution,x:string[],z:string[]):void{
        let data:any = [];
        let t:number[] = [];
        let xTraces:any[] = [];
        let zTraces:any[] = [];
        data.push({x:solution.stateSwitches,y:solution.states,type:"scattergl",mode:'markers+lines',name:"State",
        line: {shape: 'hv'},});
        x.forEach(function(item){
            xTraces.push({x:t,y:[],type:"scattergl",mode:'markers+lines',name:item});
        });
        z.forEach(function(item){
            zTraces.push({x:t,y:[],type:"scattergl",mode:'markers+lines',name:item});
        })
        solution.values.forEach(function(value,index){
            t.push(value.t);
            xTraces.forEach(function(item,id:number){
                item.y.push(value.x.get(id));
            });
            zTraces.forEach(function(item,id){
                item.y.push(value.z.get(id));
            });
        });
        xTraces.forEach(function(item){
            data.push(item);
        });
        zTraces.forEach(function(item){
            data.push(item);
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
        throw new Error("Not implemented");
    },
    getText:function():string{
        return editor.getValue();
    },
    getEdaeSolver:function(parameters:UIParameters){
        let eventDetection:EventDetection;
        if(parameters["zero-crossing"]){
            eventDetection = new EventDetectionComplex(
                parameters["zc-newton-iters"],
                parameters["zc-rel-tol"],parameters["zc-abs-tol"],parameters["zc-newton-alpha"],
                parameters["zc-bisect-iters"],parameters["zc-time-abs-tol"],parameters["zc-time-rel-tol"]);
        }else{
            eventDetection = new EventDetectionSimple();
        }
        let adaptiveStepStrategy:AdaptiveStepStrategy;
        if(parameters["adaptive-step"]){
            adaptiveStepStrategy = new AdaptiveStepNewton(parameters["adaptive-step-gamma"],parameters["adaptive-min-step"]);
        }else{
            adaptiveStepStrategy = null;
        } 
        return new EDAEHybridSolver(eventDetection,adaptiveStepStrategy);  
    },
    getIdaeSolver:function(parameters:UIParameters):IDAEHybridSolver{
        let eventDetection:EventDetection;
        if(parameters["zero-crossing"]){
            eventDetection = new EventDetectionComplex(
                parameters["zc-newton-iters"],
                parameters["zc-rel-tol"],parameters["zc-abs-tol"],parameters["zc-newton-alpha"],
                parameters["zc-bisect-iters"],parameters["zc-time-abs-tol"],parameters["zc-time-rel-tol"]);
        }else{
            eventDetection = new EventDetectionSimple();
        }
        let adaptiveStepStrategy:AdaptiveStepStrategy;
        if(parameters["adaptive-step"]){
            adaptiveStepStrategy = new AdaptiveStepNewton(parameters["adaptive-step-gamma"],parameters["adaptive-min-step"]);
        }else{
            adaptiveStepStrategy = null;
        } 
        return new IDAEHybridSolver(eventDetection,adaptiveStepStrategy);       
    },
    run:function():void{
        let parameters = ui.getParameters();
        //let daeSolver:EDAESolver = methods[parameters["dae-method"]].edaeInit(parameters);
        //Test.testWeissingerImplicit();
        //Test.testArenstorfOrbit(daeSolver);
        //Test.testSimplification();
        //Test.runTests();
        //return;
        //throw new Error("Not implemented");
        ui.clearErrors();
        ui.initPlot();
        let text = ui.getText();
        try{
            let compiler = new HybridSystemCompiler(parameters["zc-border-tol"]);
            let solution;
            let x;
            let z;
            if(parameters["dae-form"] == "explicit"){
                let sysDef = compiler.compileExplicit(text);
                let daeSolver:EDAESolver = methods[parameters["dae-method"]].edaeInit(parameters);
                let solver = ui.getEdaeSolver(parameters);
                solution = solver.solve(sysDef.x0,parameters.t0,parameters.t0+parameters.time,
                    daeSolver,sysDef.system);
                x = sysDef.x;
                z = sysDef.z;
            }else{
                let sysDef = compiler.compileImplicit(text);
                let daeSolver:IDAESolver = methods[parameters["dae-method"]].idaeInit(parameters);
                let solver = ui.getIdaeSolver(parameters);
                solution = solver.solve(sysDef.x0,sysDef.z0,parameters.t0,parameters.t0 + parameters.time,
                    daeSolver,sysDef.system);
                x = sysDef.x;
                z = sysDef.z;
            }
            if(parameters.simplification){
                let simplification:ISimplificationAlgorithm = simpMethods[parameters["simp-method"]](parameters);
                solution.values = simplification.simplify(solution.values);
            }
            ui.addLogMessage(`Steps: ${solution.statistics.steps}`);
            ui.addLogMessage(`Min step: ${solution.statistics.minStep}`);
            ui.addLogMessage(`Max step: ${solution.statistics.maxStep}`);
            ui.addLogMessage(`State changes: ${solution.statistics.statesSwitched}`);
            ui.plotSolution(solution,x,z);
            ui.openTab("results");
        }catch(e){
            handleErrors(e);
            ui.openTab("main");
            ui.openTab("errors-tab");
        }
    }
}