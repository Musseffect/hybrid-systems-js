import {ui} from "./ui";
import $ from "jquery";

ui.init();

(function(){
    var data:any = [];
      var layout = {
        title:'Result',
        width:$("#plot-area").width(),
        height:$("#plot-area").height(),
        paper_bgcolor: 'rgba(245,245,245,1)',
        plot_bgcolor: 'rgba(245,245,245,1)',
        nticks:30
      };
      //@ts-ignore
    Plotly.newPlot('plot-area',data,layout,{responsive:true});
})();
window.onresize = function(){
  if(ui.isResultsTab){
      //@ts-ignore
    Plotly.relayout('plot-area',{
      width:$("#plot-area").width(),
      height:$("#plot-area").height()
    })
    //console.log($("#plot-area").width());
  }
}

ui.openTab("run");
ui.addLogMessage("Start");
ui.loadDaeExample("stiff-equation");
ui.showDebug();