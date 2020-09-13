import { handleErrors, ui } from "../ui";
import { DAECompiler } from "../compiler/compiler";



export function testEquations(){
    let parameters = ui.getParameters();
    let text:string = ui.getText();
    let compiler = new DAECompiler();
    ui.clearErrors();
    ui.clearLog();
    try{
        if(parameters["dae-form"] =="explicit"){
            let {system,x0,x,z} = compiler.compileExplicit(text);
            system._f.forEach(function(item,index){
                ui.addLogMessage(`f[${index}]: der(${x[index]}) = ${item.print()};`);
            });
            system._g.forEach(function(item,index){
                ui.addLogMessage(`g[${index}]: ${z[index]} = ${item.print()};`);
            });
        }else{
            let {system,x0,x,z,z0} = compiler.compileImplicit(text);
            system._f.forEach(function(item,index){
                ui.addLogMessage(`f[${index}]: ${item.print()} = 0;`);
            });
            system._g.forEach(function(item,index){
                ui.addLogMessage(`g[${index}]: ${item.print()} = 0;`);
            });
        }
    }catch(e){
        handleErrors(e);
        ui.openTab("main");
        ui.openTab("errors-tab");
    }
}