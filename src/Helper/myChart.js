import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_material from "@amcharts/amcharts4/themes/material";

am4core.useTheme(am4themes_animated);


export class myChart {

  setPieChart(am4core,div,title,category,setVal,data,mode='style1'){
      am4core.unuseTheme(am4themes_dark);
      am4core.useTheme(am4themes_material);
      let chart = am4core.create(div, am4charts.PieChart);
      chart.padding(0, 0, 10, 0);
      // Set inner radius
      chart.innerRadius = am4core.percent(30);
      let setTitle = chart.titles.create();
      setTitle.text = title;
      
      setTitle.fontSize = 14;
      setTitle.marginTop = 10;
      setTitle.marginBottom = 0;

      chart.data =data;
      // Add and configure Series
      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = setVal;
      pieSeries.slices.template.propertyFields.fill = "color";
      pieSeries.dataFields.category = category;
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;
      pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
      pieSeries.labels.template.fontSize=9;
      pieSeries.labels.template.radius = am4core.percent(-15);
      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;
      let asActive = pieSeries.slices.template.states.getKey("active");
      asActive.properties.shiftRadius = 0;

      let currentSlice;
      pieSeries.slices.template.events.on("hit", (ev)=>{

        currentSlice = ev.target;
        currentSlice.tooltipText = "{category}: {value.percent.formatNumber('#.#')}% ({value.value})";     
        currentSlice.fontSize=10;
        currentSlice.showTooltip();

      });

      //asActive.properties.shiftRadius = 0;
      
      chart.legend = new am4charts.Legend();
      chart.legend.fontSize=11;
      chart.legend.position = "right";

      let markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 20;
      markerTemplate.height = 20;

      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "right";
      chart.exporting.menu.verticalAlign = "top";
      
      return chart;
  }

  toggleSeries(series, over) {
    series.segments.each(function(segment) {
      segment.isHover = over;
    });
  }

  createMultiColumSeriesX(chart,valueAxis,field, name,catX,opacity=1,color="",stacked=false,mode="bar",catlabel=false) {
    if(mode=="line_right"){
    
    let series = chart.series.push(new am4charts.LineSeries())
        series.dataFields.valueY = field;
        
        if(catX=='date')
        series.dataFields.dateX = catX;
        else
        series.dataFields.categoryX = catX;

        series.yAxis = valueAxis;
        series.tooltipText = "[bold]{name}[/]\n[font-size:12px]{categoryX}: {valueY}";
        series.bullets.push(new am4charts.CircleBullet());
        series.strokeWidth = 2;
        series.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        series.strokeOpacity = 0.5;
        series.fillOpacity=opacity;
        series.connect = false;

        series.propertyFields.stroke = "color";
        series.propertyFields.fill = "color";
        

        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = 0.1;
        labelBullet.label.fill = am4core.color("#000");
        labelBullet.label.hideOversized = true;
        labelBullet.label.truncate = true;
        labelBullet.label.fontSize=10;
    }
    else if(mode=="line"){
    
    let series = chart.series.push(new am4charts.LineSeries())
        series.name = name;
        series.dataFields.valueY = field;
        
        if(catX=='date')
        series.dataFields.dateX = catX;
        else
        series.dataFields.categoryX = catX;

        series.tooltipText = "[bold]{name}[/]\n[font-size:12px]{categoryX}: {valueY}";
      
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.maxTooltipDistance = -1;

        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#FFF");
        series.tooltip.label.fill = color;
        series.tooltip.getStrokeFromObject = false;
        series.tooltip.background.strokeWidth = 2;
        // series.sequencedInterpolation = true;
        
        let bullet = series.bullets.push(new am4charts.CircleBullet());

        bullet.circle.radius = 3;
        bullet.circle.fill = am4core.color("#fff");
        bullet.circle.strokeWidth = 2;

        series.strokeWidth = 2;
        series.strokeOpacity = 1;
        series.fillOpacity=opacity;
        series.connect = false;

        series.propertyFields.stroke = "color";
        series.propertyFields.fill = "color";

        if(color!=""){
          series.stroke = am4core.color(color);
          series.fill = am4core.color(color);
          // series.lines.template.fill=color;
        }
        /*else{
          series.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        }*/
        
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = -0.2;
        if(color!=""){
        labelBullet.label.fill = am4core.color(color);
        }
        else
        labelBullet.label.fill = am4core.color("#000");
        /*labelBullet.label.hideOversized = true;
        labelBullet.label.truncate = true;*/
        labelBullet.label.fontSize=9;
    }
    else{
    // Set up series
    let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.strokeWidth = 1;
      series.stroke = am4core.color("#fff");
      series.dataFields.valueY = field;
      if(catX=='date')
      series.dataFields.dateX = catX;
      else
      series.dataFields.categoryX = catX;
      series.sequencedInterpolation = true;
      
      // Make it stacked
      series.stacked = stacked;
      series.fillOpacity=opacity;
      
      if(color!=""){
        series.columns.template.fill=color;
      }
      else{
        series.columns.template.adapter.add("fill", function(fill, target){
          return chart.colors.getIndex(target.dataItem.index);
        });
      }

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:12px]{categoryX}: {valueY}";
      // hovering
      series.legendSettings.itemLabelText = name+":";
      series.legendSettings.itemValueText = "{valueY}";
      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.fill = am4core.color("#fff");
      labelBullet.label.hideOversized = true;
      labelBullet.label.truncate = true;
      labelBullet.label.fontSize=10;
      
    }
    
    //return series;
  }

  createMultiColumSeriesY(chart,valueAxis,field, name,catY,opacity=1,color="",stacked=false,mode="bar",catlabel=false) {
    
      let series = chart.series.push(new am4charts.ColumnSeries());
          series.strokeWidth = 1;
          series.stroke = am4core.color("#fff");
          series.dataFields.valueX = field;
          series.dataFields.categoryY = catY;
          series.name = name;
          series.stacked = stacked;
          series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
          series.columns.template.height = am4core.percent(100);
          
          series.sequencedInterpolation = true;
          
          series.fillOpacity=opacity;

          if(color!=""){
            series.columns.template.fill=color;
          }
          else{
            series.columns.template.adapter.add("fill", function(fill, target){
              return chart.colors.getIndex(target.dataItem.index);
            });
          }

          let valueLabel = series.bullets.push(new am4charts.LabelBullet());
          valueLabel.label.text = "{valueX}";
          
          if(catlabel){
            valueLabel.label.horizontalCenter = "left";
            valueLabel.label.dx = 10;  
          }
          else{
            valueLabel.label.horizontalCenter = "right";
            valueLabel.label.dx = -3;
          }
          
          valueLabel.label.fill = am4core.color("#fff");
          valueLabel.label.hideOversized = true;
          valueLabel.label.truncate = true;
          valueLabel.label.fontSize=10;

          if(catlabel){  
          let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
          categoryLabel.label.text = "{name}";
          categoryLabel.label.horizontalCenter = "right";
          categoryLabel.label.dx = -10;
          categoryLabel.label.fill = am4core.color("#fff");
          categoryLabel.label.hideOversized = false;
          categoryLabel.label.truncate = false;
          categoryLabel.label.fontSize=10;
      }
    }

  setXYChart(am4core,div,title,category,setVal,data,mode='normal'){
      // let am4core=amc;
      am4core.useTheme(am4themes_dark);
      let chart = am4core.create(div, am4charts.XYChart);
      chart.themes=am4themes_dark;
      chart.padding(10, 10, 10, 10);

      let setTitle = chart.titles.create();
      setTitle.text = title;

      setTitle.fontSize = 14;
      setTitle.marginTop = 10;
      setTitle.marginBottom = 0;
      let valueAxis=undefined;
      if(mode=='style1'){
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = category;
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.numberFormatter.numberFormat = "#";
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.cellStartLocation = 0.05;
        categoryAxis.renderer.cellEndLocation = 0.95;
        categoryAxis.fontSize=10;
        
        chart.scrollbarY = new am4core.Scrollbar();
      }
      else{
        valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.inside = false;
        valueAxis.renderer.labels.template.disabled = false;
        valueAxis.min = 0;
        valueAxis.fontSize=11;

        chart.scrollbarX = new am4core.Scrollbar();
      }

      if(mode=='style1'){
        valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        //valueAxis.max = 100;
        valueAxis.renderer.opposite = true;
        valueAxis.fontSize=11;
        valueAxis.strictMinMax = true;
      }
      else{
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = category;
        categoryAxis.renderer.grid.template.location = 0; 
        categoryAxis.fontSize=10;
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.tooltip.disabled = false;
      }

      chart.data = data;

      let valueAxis2=undefined;

      if(setVal){
        for (var i = 0; i < setVal.length; i++) {
          let stacked=false;
          if(setVal[i].stacked!=undefined)  
          stacked=setVal[i].stacked;

          let chartmode="bar";
          if(setVal[i].mode!=undefined)  
          chartmode=setVal[i].mode;

          if(valueAxis2==undefined && chartmode=="line_right"){
            valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis2.renderer.opposite = true;
            valueAxis2.min = 0;
            valueAxis2.max = 100;
            valueAxis2.strictMinMax = true;
            //valueAxis2.renderer.grid.template.disabled = true;
            valueAxis2.cursorTooltipEnabled = false;
            valueAxis2.fontSize=11;
          }

          if(mode=='style1')
          this.createMultiColumSeriesY(chart,valueAxis2,setVal[i].var, setVal[i].val,category,setVal[i].opacity,setVal[i].color,stacked,chartmode);
          else
          this.createMultiColumSeriesX(chart,valueAxis2,setVal[i].var, setVal[i].val,category,setVal[i].opacity,setVal[i].color,stacked,chartmode);  
        }      
      }

      chart.legend = new am4charts.Legend();
      chart.legend.fontSize=11;

      let markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 15;
      markerTemplate.height = 15;

      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "right";
      chart.exporting.menu.verticalAlign = "top";
      
      return chart;
  }

  
  /*render() {
    return (
      <div>
        <h2>Contact</h2>
        <p>On progress
        </p>
      </div>
    );
  }*/
}
 
export default myChart;