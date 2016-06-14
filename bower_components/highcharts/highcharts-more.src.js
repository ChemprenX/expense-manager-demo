!function(t){"object"==typeof module&&module.exports?module.exports=t:t(Highcharts)}(function(t){function i(t,i,a){this.init(t,i,a)}var a,e=t.arrayMin,o=t.arrayMax,n=t.each,r=t.extend,s=t.merge,l=t.map,h=t.pick,p=t.pInt,c=t.getOptions().plotOptions,d=t.seriesTypes,u=t.extendClass,g=t.splat,f=t.wrap,m=t.Axis,y=t.Tick,b=t.Point,x=t.Pointer,P=t.CenteredSeriesMixin,A=t.TrackerMixin,L=t.Series,w=Math,M=w.round,v=w.floor,k=w.max,C=t.Color,S=function(){};r(i.prototype,{init:function(t,i,a){var e,o=this,r=o.defaultOptions;o.chart=i,o.options=t=s(r,i.angular?{background:{}}:void 0,t),e=t.background,e&&n([].concat(g(e)).reverse(),function(t){var i=t.backgroundColor,e=a.userOptions;t=s(o.defaultBackgroundOptions,t),i&&(t.backgroundColor=i),t.color=t.backgroundColor,a.options.plotBands.unshift(t),e.plotBands=e.plotBands||[],e.plotBands!==a.options.plotBands&&e.plotBands.unshift(t)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});var T=m.prototype,Y=y.prototype,X={getOffset:S,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:S,setCategories:S,setTitle:S},R={isRadial:!0,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(t){var i=this.options=s(this.defaultOptions,this.defaultRadialOptions,t);i.plotBands||(i.plotBands=[])},getOffset:function(){T.getOffset.call(this),this.chart.axisOffset[this.side]=0,this.center=this.pane.center=P.getCenter.call(this.pane)},getLinePath:function(t,i){var a=this.center;return i=h(i,a[2]/2-this.offset),this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],i,i,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0})},setAxisTranslation:function(){T.setAxisTranslation.call(this),this.center&&(this.isCircular?this.transA=(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.transA=this.center[2]/2/(this.max-this.min||1),this.isXAxis?this.minPixelPadding=this.transA*this.minPointOffset:this.minPixelPadding=0)},beforeSetTickPositions:function(){this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0)},setAxisSize:function(){T.setAxisSize.call(this),this.isRadial&&(this.center=this.pane.center=t.CenteredSeriesMixin.getCenter.call(this.pane),this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*h(this.sector,1)/2)},getPosition:function(t,i){return this.postTranslate(this.isCircular?this.translate(t):0,h(this.isCircular?i:this.translate(t),this.center[2]/2)-this.offset)},postTranslate:function(t,i){var a=this.chart,e=this.center;return t=this.startAngleRad+t,{x:a.plotLeft+e[0]+Math.cos(t)*i,y:a.plotTop+e[1]+Math.sin(t)*i}},getPlotBandPath:function(t,i,a){var e,o,n,r,s=this.center,c=this.startAngleRad,d=s[2]/2,u=[h(a.outerRadius,"100%"),a.innerRadius,h(a.thickness,10)],g=/%$/,f=this.isCircular;return"polygon"===this.options.gridLineInterpolation?r=this.getPlotLinePath(t).concat(this.getPlotLinePath(i,!0)):(t=Math.max(t,this.min),i=Math.min(i,this.max),f||(u[0]=this.translate(t),u[1]=this.translate(i)),u=l(u,function(t){return g.test(t)&&(t=p(t,10)*d/100),t}),"circle"!==a.shape&&f?(e=c+this.translate(t),o=c+this.translate(i)):(e=-Math.PI/2,o=1.5*Math.PI,n=!0),r=this.chart.renderer.symbols.arc(this.left+s[0],this.top+s[1],u[0],u[0],{start:Math.min(e,o),end:Math.max(e,o),innerR:h(u[1],u[0]-u[2]),open:n})),r},getPlotLinePath:function(t,i){var a,e,o,r,s=this,l=s.center,h=s.chart,p=s.getPosition(t);return s.isCircular?r=["M",l[0]+h.plotLeft,l[1]+h.plotTop,"L",p.x,p.y]:"circle"===s.options.gridLineInterpolation?(t=s.translate(t),t&&(r=s.getLinePath(0,t))):(n(h.xAxis,function(t){t.pane===s.pane&&(a=t)}),r=[],t=s.translate(t),o=a.tickPositions,a.autoConnect&&(o=o.concat([o[0]])),i&&(o=[].concat(o).reverse()),n(o,function(i,o){e=a.getPosition(i,t),r.push(o?"L":"M",e.x,e.y)})),r},getTitlePosition:function(){var t=this.center,i=this.chart,a=this.options.title;return{x:i.plotLeft+t[0]+(a.x||0),y:i.plotTop+t[1]-{high:.5,middle:.25,low:0}[a.align]*t[2]+(a.y||0)}}};f(T,"init",function(t,e,o){var n,l,p,c,d,u,f=this,m=e.angular,y=e.polar,b=o.isX,x=m&&b,P=e.options,A=o.pane||0;m?(r(this,x?X:R),n=!b,n&&(this.defaultRadialOptions=this.defaultRadialGaugeOptions)):y&&(r(this,R),n=b,this.defaultRadialOptions=b?this.defaultRadialXOptions:s(this.defaultYAxisOptions,this.defaultRadialYOptions)),t.call(this,e,o),x||!m&&!y||(c=this.options,e.panes||(e.panes=[]),this.pane=d=e.panes[A]=e.panes[A]||new i(g(P.pane)[A],e,f),u=d.options,e.inverted=!1,P.chart.zoomType=null,this.startAngleRad=l=(u.startAngle-90)*Math.PI/180,this.endAngleRad=p=(h(u.endAngle,u.startAngle+360)-90)*Math.PI/180,this.offset=c.offset||0,this.isCircular=n,n&&o.max===a&&p-l===2*Math.PI&&(this.autoConnect=!0))}),f(Y,"getPosition",function(t,i,a,e,o){var n=this.axis;return n.getPosition?n.getPosition(a):t.call(this,i,a,e,o)}),f(Y,"getLabelPosition",function(t,i,a,e,o,n,r,s,l){var p,c=this.axis,d=n.y,u=20,g=n.align,f=(c.translate(this.pos)+c.startAngleRad+Math.PI/2)/Math.PI*180%360;return c.isRadial?(p=c.getPosition(this.pos,c.center[2]/2+h(n.distance,-25)),"auto"===n.rotation?e.attr({rotation:f}):null===d&&(d=c.chart.renderer.fontMetrics(e.styles.fontSize).b-e.getBBox().height/2),null===g&&(c.isCircular?(this.label.getBBox().width>c.len*c.tickInterval/(c.max-c.min)&&(u=0),g=f>u&&180-u>f?"left":f>180+u&&360-u>f?"right":"center"):g="center",e.attr({align:g})),p.x+=n.x,p.y+=d):p=t.call(this,i,a,e,o,n,r,s,l),p}),f(Y,"getMarkPath",function(t,i,a,e,o,n,r){var s,l,h=this.axis;return h.isRadial?(s=h.getPosition(this.pos,h.center[2]/2+e),l=["M",i,a,"L",s.x,s.y]):l=t.call(this,i,a,e,o,n,r),l}),c.arearange=s(c.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0},states:{hover:{halo:!1}}}),d.arearange=u(d.area,{type:"arearange",pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],toYData:function(t){return[t.low,t.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(t){var i=this.chart,a=this.xAxis.postTranslate(t.rectPlotX,this.yAxis.len-t.plotHigh);t.plotHighX=a.x-i.plotLeft,t.plotHigh=a.y-i.plotTop},getSegments:function(){var t=this;n(t.points,function(i){t.options.connectNulls||null!==i.low&&null!==i.high?null===i.low&&null!==i.high&&(i.y=i.high):i.y=null}),L.prototype.getSegments.call(this)},translate:function(){var t=this,i=t.yAxis;d.area.prototype.translate.apply(t),n(t.points,function(t){var a=t.low,e=t.high,o=t.plotY;null===e&&null===a?t.y=null:null===a?(t.plotLow=t.plotY=null,t.plotHigh=i.translate(e,0,1,0,1)):null===e?(t.plotLow=o,t.plotHigh=null):(t.plotLow=o,t.plotHigh=i.translate(e,0,1,0,1))}),this.chart.polar&&n(this.points,function(i){t.highToXY(i)})},getSegmentPath:function(i){var a,e,o,n,r,s=[],l=i.length,h=L.prototype.getSegmentPath,p=this.options,c=p.step;for(a=t.grep(i,function(t){return null!==t.plotLow});l--;)e=i[l],null!==e.plotHigh&&s.push({plotX:e.plotHighX||e.plotX,plotY:e.plotHigh});return n=h.call(this,a),c&&(c===!0&&(c="left"),p.step={left:"right",center:"center",right:"left"}[c]),r=h.call(this,s),p.step=c,o=[].concat(n,r),this.chart.polar||(r[0]="L"),this.areaPath=this.areaPath.concat(n,r),o},drawDataLabels:function(){var t,i,a,e=this.data,o=e.length,n=[],r=L.prototype,s=this.options.dataLabels,l=s.align,h=s.verticalAlign,p=s.inside,c=this.chart.inverted;if(s.enabled||this._hasPointLabels){for(t=o;t--;)i=e[t],i&&(a=p?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,i.y=i.high,i._plotY=i.plotY,i.plotY=i.plotHigh,n[t]=i.dataLabel,i.dataLabel=i.dataLabelUpper,i.below=a,c?l||(s.align=a?"right":"left"):h||(s.verticalAlign=a?"top":"bottom"),s.x=s.xHigh,s.y=s.yHigh);for(r.drawDataLabels&&r.drawDataLabels.apply(this,arguments),t=o;t--;)i=e[t],i&&(a=p?i.plotHigh<i.plotLow:i.plotHigh>i.plotLow,i.dataLabelUpper=i.dataLabel,i.dataLabel=n[t],i.y=i.low,i.plotY=i._plotY,i.below=!a,c?l||(s.align=a?"left":"right"):h||(s.verticalAlign=a?"bottom":"top"),s.x=s.xLow,s.y=s.yLow);r.drawDataLabels&&r.drawDataLabels.apply(this,arguments)}s.align=l,s.verticalAlign=h},alignDataLabel:function(){d.column.prototype.alignDataLabel.apply(this,arguments)},setStackedPoints:S,getSymbol:S,drawPoints:S}),c.areasplinerange=s(c.arearange),d.areasplinerange=u(d.arearange,{type:"areasplinerange",getPointSpline:d.spline.prototype.getPointSpline}),function(){var t=d.column.prototype;c.columnrange=s(c.column,c.arearange,{lineWidth:1,pointRange:null}),d.columnrange=u(d.arearange,{type:"columnrange",translate:function(){var i,a=this,e=a.yAxis,o=a.xAxis,r=a.chart;t.translate.apply(a),n(a.points,function(t){var n,s,l,h=t.shapeArgs,p=a.options.minPointLength;t.plotHigh=i=e.translate(t.high,0,1,0,1),t.plotLow=t.plotY,l=i,s=t.plotY-i,Math.abs(s)<p?(n=p-s,s+=n,l-=n/2):0>s&&(s*=-1,l-=s),h.height=s,h.y=l,t.tooltipPos=r.inverted?[e.len+e.pos-r.plotLeft-l-s/2,o.len+o.pos-r.plotTop-h.x-h.width/2,s]:[o.left-r.plotLeft+h.x+h.width/2,e.pos-r.plotTop+l+s/2,s]})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:S,crispCol:t.crispCol,pointAttrToOptions:t.pointAttrToOptions,drawPoints:t.drawPoints,drawTracker:t.drawTracker,animate:t.animate,getColumnMetrics:t.getColumnMetrics})}(),c.gauge=s(c.line,{dataLabels:{enabled:!0,defer:!1,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1});var z=u(b,{setState:function(t){this.state=t}}),D={type:"gauge",pointClass:z,angular:!0,drawGraph:S,fixedBox:!0,forceDL:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var t=this,i=t.yAxis,a=t.options,e=i.center;t.generatePoints(),n(t.points,function(t){var o=s(a.dial,t.dial),n=p(h(o.radius,80))*e[2]/200,r=p(h(o.baseLength,70))*n/100,l=p(h(o.rearLength,10))*n/100,c=o.baseWidth||3,d=o.topWidth||1,u=a.overshoot,g=i.startAngleRad+i.translate(t.y,null,null,null,!0);u&&"number"==typeof u?(u=u/180*Math.PI,g=Math.max(i.startAngleRad-u,Math.min(i.endAngleRad+u,g))):a.wrap===!1&&(g=Math.max(i.startAngleRad,Math.min(i.endAngleRad,g))),g=180*g/Math.PI,t.shapeType="path",t.shapeArgs={d:o.path||["M",-l,-c/2,"L",r,-c/2,n,-d/2,n,d/2,r,c/2,-l,c/2,"z"],translateX:e[0],translateY:e[1],rotation:g},t.plotX=e[0],t.plotY=e[1]})},drawPoints:function(){var t=this,i=t.yAxis.center,a=t.pivot,e=t.options,o=e.pivot,r=t.chart.renderer;n(t.points,function(i){var a=i.graphic,o=i.shapeArgs,n=o.d,l=s(e.dial,i.dial);a?(a.animate(o),o.d=n):i.graphic=r[i.shapeType](o).attr({stroke:l.borderColor||"none","stroke-width":l.borderWidth||0,fill:l.backgroundColor||"black",rotation:o.rotation,zIndex:1}).add(t.group)}),a?a.animate({translateX:i[0],translateY:i[1]}):t.pivot=r.circle(0,0,h(o.radius,5)).attr({"stroke-width":o.borderWidth||0,stroke:o.borderColor||"silver",fill:o.backgroundColor||"black",zIndex:2}).translate(i[0],i[1]).add(t.group)},animate:function(t){var i=this;t||(n(i.points,function(t){var a=t.graphic;a&&(a.attr({rotation:180*i.yAxis.startAngleRad/Math.PI}),a.animate({rotation:t.shapeArgs.rotation},i.options.animation))}),i.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup),L.prototype.render.call(this),this.group.clip(this.chart.clipRect)},setData:function(t,i){L.prototype.setData.call(this,t,!1),this.processData(),this.generatePoints(),h(i,!0)&&this.chart.redraw()},drawTracker:A&&A.drawTrackerPoint};d.gauge=u(d.line,D),c.boxplot=s(c.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'},whiskerLength:"50%",whiskerWidth:2}),d.boxplot=u(d.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],toYData:function(t){return[t.low,t.q1,t.median,t.q3,t.high]},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:S,translate:function(){var t=this,i=t.yAxis,a=t.pointArrayMap;d.column.prototype.translate.apply(t),n(t.points,function(t){n(a,function(a){null!==t[a]&&(t[a+"Plot"]=i.translate(t[a],0,1,0,1))})})},drawPoints:function(){var t,i,e,o,r,s,l,p,c,d,u,g,f,m,y,b,x,P,A,L,w,k,C,S=this,T=S.points,Y=S.options,X=S.chart,R=X.renderer,z=S.doQuartiles!==!1,D=S.options.whiskerLength;n(T,function(n){c=n.graphic,w=n.shapeArgs,u={},m={},b={},k=n.color||S.color,n.plotY!==a&&(t=n.pointAttr[n.selected?"selected":""],x=w.width,P=v(w.x),A=P+x,L=M(x/2),i=v(z?n.q1Plot:n.lowPlot),e=v(z?n.q3Plot:n.lowPlot),o=v(n.highPlot),r=v(n.lowPlot),u.stroke=n.stemColor||Y.stemColor||k,u["stroke-width"]=h(n.stemWidth,Y.stemWidth,Y.lineWidth),u.dashstyle=n.stemDashStyle||Y.stemDashStyle,m.stroke=n.whiskerColor||Y.whiskerColor||k,m["stroke-width"]=h(n.whiskerWidth,Y.whiskerWidth,Y.lineWidth),b.stroke=n.medianColor||Y.medianColor||k,b["stroke-width"]=h(n.medianWidth,Y.medianWidth,Y.lineWidth),l=u["stroke-width"]%2/2,p=P+L+l,d=["M",p,e,"L",p,o,"M",p,i,"L",p,r],z&&(l=t["stroke-width"]%2/2,p=v(p)+l,i=v(i)+l,e=v(e)+l,P+=l,A+=l,g=["M",P,e,"L",P,i,"L",A,i,"L",A,e,"L",P,e,"z"]),D&&(l=m["stroke-width"]%2/2,o+=l,r+=l,C=/%$/.test(D)?L*parseFloat(D)/100:D/2,f=["M",p-C,o,"L",p+C,o,"M",p-C,r,"L",p+C,r]),l=b["stroke-width"]%2/2,s=M(n.medianPlot)+l,y=["M",P,s,"L",A,s],c?(n.stem.animate({d:d}),D&&n.whiskers.animate({d:f}),z&&n.box.animate({d:g}),n.medianShape.animate({d:y})):(n.graphic=c=R.g().add(S.group),n.stem=R.path(d).attr(u).add(c),D&&(n.whiskers=R.path(f).attr(m).add(c)),z&&(n.box=R.path(g).attr(t).add(c)),n.medianShape=R.path(y).attr(b).add(c)))})},setStackedPoints:S}),c.errorbar=s(c.boxplot,{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'<span style="color:{point.color}">●</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'},whiskerWidth:null}),d.errorbar=u(d.boxplot,{type:"errorbar",pointArrayMap:["low","high"],toYData:function(t){return[t.low,t.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:d.arearange?d.arearange.prototype.drawDataLabels:S,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||d.column.prototype.getColumnMetrics.call(this)}}),c.waterfall=s(c.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333",dataLabels:{inside:!0},states:{hover:{lineWidthPlus:0}}}),d.waterfall=u(d.column,{type:"waterfall",upColorProp:"fill",pointValKey:"y",translate:function(){var t,i,a,e,o,n,r,s,l,p,c,u,g=this,f=g.options,m=g.yAxis,y=h(f.minPointLength,5),b=f.threshold,x=f.stacking;for(d.column.prototype.translate.apply(this),g.minPointLengthOffset=0,l=p=b,a=g.points,i=0,t=a.length;t>i;i++)e=a[i],s=this.processedYData[i],o=e.shapeArgs,n=x&&m.stacks[(g.negStacks&&b>s?"-":"")+g.stackKey],c=n?n[e.x].points[g.index+","+i]:[0,s],e.isSum?e.y=s:e.isIntermediateSum&&(e.y=s-p),r=k(l,l+e.y)+c[0],o.y=m.translate(r,0,1),e.isSum?(o.y=m.translate(c[1],0,1),o.height=Math.min(m.translate(c[0],0,1),m.len)-o.y+g.minPointLengthOffset):e.isIntermediateSum?(o.y=m.translate(c[1],0,1),o.height=Math.min(m.translate(p,0,1),m.len)-o.y+g.minPointLengthOffset,p=c[1]):(0!==l&&(o.height=s>0?m.translate(l,0,1)-o.y:m.translate(l,0,1)-m.translate(l-s,0,1)),l+=s),o.height<0&&(o.y+=o.height,o.height*=-1),e.plotY=o.y=M(o.y)-g.borderWidth%2/2,o.height=k(M(o.height),.001),e.yBottom=o.y+o.height,o.height<=y&&(o.height=y,g.minPointLengthOffset+=y),o.y-=g.minPointLengthOffset,u=e.plotY+(e.negative?o.height:0)-g.minPointLengthOffset,g.chart.inverted?e.tooltipPos[0]=m.len-u:e.tooltipPos[1]=u},processData:function(t){var i,a,e,o,n,r,s,l=this,h=l.options,p=l.yData,c=l.options.data,d=p.length,u=h.threshold||0;for(e=a=o=n=u,s=0;d>s;s++)r=p[s],i=c&&c[s]?c[s]:{},"sum"===r||i.isSum?p[s]=e:"intermediateSum"===r||i.isIntermediateSum?p[s]=a:(e+=r,a+=r),o=Math.min(e,o),n=Math.max(e,n);L.prototype.processData.call(this,t),l.dataMin=o,l.dataMax=n},toYData:function(t){return t.isSum?0===t.x?null:"sum":t.isIntermediateSum?0===t.x?null:"intermediateSum":t.y},getAttribs:function(){d.column.prototype.getAttribs.apply(this,arguments);var i=this,a=i.options,e=a.states,o=a.upColor||i.color,r=t.Color(o).brighten(.1).get(),l=s(i.pointAttr),h=i.upColorProp;l[""][h]=o,l.hover[h]=e.hover.upColor||r,l.select[h]=e.select.upColor||o,n(i.points,function(t){t.options.color||(t.y>0?(t.pointAttr=l,t.color=o):t.pointAttr=i.pointAttr)})},getGraphPath:function(){var t,i,a,e,o=this.data,n=o.length,r=this.options.lineWidth+this.borderWidth,s=M(r)%2/2,l=[],h="M",p="L";for(a=1;n>a;a++)i=o[a].shapeArgs,t=o[a-1].shapeArgs,e=[h,t.x+t.width,t.y+s,p,i.x,t.y+s],o[a-1].y<0&&(e[2]+=t.height,e[5]+=t.height),l=l.concat(e);return l},getExtremes:S,drawGraph:L.prototype.drawGraph}),c.polygon=s(c.scatter,{marker:{enabled:!1}}),d.polygon=u(d.scatter,{type:"polygon",fillGraph:!0,getSegmentPath:function(t){return L.prototype.getSegmentPath.call(this,t).concat("z")},drawGraph:L.prototype.drawGraph,drawLegendSymbol:t.LegendSymbolMixin.drawRectangle}),c.bubble=s(c.scatter,{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"});var O=u(b,{haloPath:function(){return b.prototype.haloPath.call(this,this.shapeArgs.r+this.series.options.states.hover.halo.size)},ttBelow:!1});d.bubble=u(d.scatter,{type:"bubble",pointClass:O,pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],bubblePadding:!0,zoneAxis:"z",pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(t){var i=this.options.marker,a=h(i.fillOpacity,.5);return t=t||i.fillColor||this.color,1!==a&&(t=C(t).setOpacity(a).get("rgba")),t},convertAttribs:function(){var t=L.prototype.convertAttribs.apply(this,arguments);return t.fill=this.applyOpacity(t.fill),t},getRadii:function(t,i,a,e){var o,n,r,s,l,h=this.zData,p=[],c=this.options,d="width"!==c.sizeBy,u=c.zThreshold,g=i-t;for(n=0,o=h.length;o>n;n++)s=h[n],c.sizeByAbsoluteValue&&null!==s&&(s=Math.abs(s-u),i=Math.max(i-u,Math.abs(t-u)),t=0),null===s?l=null:t>s?l=a/2-1:(r=g>0?(s-t)/g:.5,d&&r>=0&&(r=Math.sqrt(r)),l=w.ceil(a+r*(e-a))/2),p.push(l);this.radii=p},animate:function(t){var i=this.options.animation;t||(n(this.points,function(t){var a=t.graphic,e=t.shapeArgs;a&&e&&(a.attr("r",1),a.animate({r:e.r},i))}),this.animate=null)},translate:function(){var t,i,e,o=this.data,n=this.radii;for(d.scatter.prototype.translate.call(this),t=o.length;t--;)i=o[t],e=n?n[t]:0,"number"==typeof e&&e>=this.minPxSize/2?(i.shapeType="circle",i.shapeArgs={x:i.plotX,y:i.plotY,r:e},i.dlBox={x:i.plotX-e,y:i.plotY-e,width:2*e,height:2*e}):i.shapeArgs=i.plotY=i.dlBox=a},drawLegendSymbol:function(t,i){var a=this.chart.renderer,e=a.fontMetrics(t.itemStyle.fontSize).f/2;i.legendSymbol=a.circle(e,t.baseline-e,e).attr({zIndex:3}).add(i.legendGroup),i.legendSymbol.isMarker=!0},drawPoints:d.column.prototype.drawPoints,alignDataLabel:d.column.prototype.alignDataLabel,buildKDTree:S,applyZones:S}),m.prototype.beforePadding=function(){var t=this,i=this.len,r=this.chart,s=0,l=i,c=this.isXAxis,d=c?"xData":"yData",u=this.min,g={},f=w.min(r.plotWidth,r.plotHeight),m=Number.MAX_VALUE,y=-Number.MAX_VALUE,b=this.max-u,x=i/b,P=[];n(this.series,function(i){var a,s=i.options;!i.bubblePadding||!i.visible&&r.options.chart.ignoreHiddenSeries||(t.allowZoomOutside=!0,P.push(i),c&&(n(["minSize","maxSize"],function(t){var i=s[t],a=/%$/.test(i);i=p(i),g[t]=a?f*i/100:i}),i.minPxSize=g.minSize,i.maxPxSize=g.maxSize,a=i.zData,a.length&&(m=h(s.zMin,w.min(m,w.max(e(a),s.displayNegative===!1?s.zThreshold:-Number.MAX_VALUE))),y=h(s.zMax,w.max(y,o(a))))))}),n(P,function(t){var i,a=t[d],e=a.length;if(c&&t.getRadii(m,y,t.minPxSize,t.maxPxSize),b>0)for(;e--;)"number"==typeof a[e]&&(i=t.radii[e],s=Math.min((a[e]-u)*x-i,s),l=Math.max((a[e]-u)*x+i,l))}),P.length&&b>0&&!this.isLog&&(l-=i,x*=(i+s-l)/i,n([["min","userMin",s],["max","userMax",l]],function(i){h(t.options[i[0]],t[i[1]])===a&&(t[i[0]]+=i[2]/x)}))},function(){function t(t,i,a){t.call(this,i,a),this.chart.polar&&(this.closeSegment=function(t){var i=this.xAxis.center;t.push("L",i[0],i[1])},this.closedStacks=!0)}function i(t,i){var a,e=this.chart,o=this.options.animation,n=this.group,r=this.markerGroup,s=this.xAxis.center,l=e.plotLeft,h=e.plotTop;e.polar?e.renderer.isSVG&&(o===!0&&(o={}),i?(a={translateX:s[0]+l,translateY:s[1]+h,scaleX:.001,scaleY:.001},n.attr(a),r&&r.attr(a)):(a={translateX:l,translateY:h,scaleX:1,scaleY:1},n.animate(a,o),r&&r.animate(a,o),this.animate=null)):t.call(this,i)}var a,e=L.prototype,o=x.prototype;e.searchPointByAngle=function(t){var i=this,a=i.chart,e=i.xAxis,o=e.pane.center,n=t.chartX-o[0]-a.plotLeft,r=t.chartY-o[1]-a.plotTop;return this.searchKDTree({clientX:180+Math.atan2(n,r)*(-180/Math.PI)})},f(e,"buildKDTree",function(t){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.kdDimensions=2),t.apply(this)}),e.toXY=function(t){var i,a,e=this.chart,o=t.plotX,n=t.plotY;t.rectPlotX=o,t.rectPlotY=n,i=this.xAxis.postTranslate(t.plotX,this.yAxis.len-n),t.plotX=t.polarPlotX=i.x-e.plotLeft,t.plotY=t.polarPlotY=i.y-e.plotTop,this.kdByAngle?(a=(o/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>a&&(a+=360),t.clientX=a):t.clientX=t.plotX},d.area&&f(d.area.prototype,"init",t),d.areaspline&&f(d.areaspline.prototype,"init",t),d.spline&&f(d.spline.prototype,"getPointSpline",function(t,i,a,e){var o,n,r,s,l,h,p,c,d,u,g,f,m,y,b,x,P,A,L=1.5,w=L+1;return this.chart.polar?(n=a.plotX,r=a.plotY,s=i[e-1],l=i[e+1],this.connectEnds&&(s||(s=i[i.length-2]),l||(l=i[1])),s&&l&&(h=s.plotX,p=s.plotY,c=l.plotX,d=l.plotY,u=(L*n+h)/w,g=(L*r+p)/w,f=(L*n+c)/w,m=(L*r+d)/w,y=Math.sqrt(Math.pow(u-n,2)+Math.pow(g-r,2)),b=Math.sqrt(Math.pow(f-n,2)+Math.pow(m-r,2)),x=Math.atan2(g-r,u-n),P=Math.atan2(m-r,f-n),A=Math.PI/2+(x+P)/2,Math.abs(x-A)>Math.PI/2&&(A-=Math.PI),u=n+Math.cos(A)*y,g=r+Math.sin(A)*y,f=n+Math.cos(Math.PI+A)*b,m=r+Math.sin(Math.PI+A)*b,a.rightContX=f,a.rightContY=m),e?(o=["C",s.rightContX||s.plotX,s.rightContY||s.plotY,u||n,g||r,n,r],s.rightContX=s.rightContY=null):o=["M",n,r]):o=t.call(this,i,a,e),o}),f(e,"translate",function(t){var i,a,e=this.chart;if(t.call(this),e.polar&&(this.kdByAngle=e.tooltip&&e.tooltip.shared,!this.preventPostTranslate))for(i=this.points,a=i.length;a--;)this.toXY(i[a])}),f(e,"getSegmentPath",function(t,i){var a=this.points;return this.chart.polar&&this.options.connectEnds!==!1&&i[i.length-1]===a[a.length-1]&&null!==a[0].y&&(this.connectEnds=!0,i=[].concat(i,[a[0]])),t.call(this,i)}),f(e,"animate",i),d.column&&(a=d.column.prototype,f(a,"animate",i),f(a,"translate",function(t){var i,a,e,o,n=this.xAxis,r=this.yAxis.len,s=n.center,l=n.startAngleRad,p=this.chart.renderer;if(this.preventPostTranslate=!0,t.call(this),n.isRadial)for(a=this.points,o=a.length;o--;)e=a[o],i=e.barX+l,e.shapeType="path",e.shapeArgs={d:p.symbols.arc(s[0],s[1],r-e.plotY,null,{start:i,end:i+e.pointWidth,innerR:r-h(e.yBottom,r)})},this.toXY(e),e.tooltipPos=[e.plotX,e.plotY],e.ttBelow=e.plotY>s[1]}),f(a,"alignDataLabel",function(t,i,a,o,n,r){if(this.chart.polar){var s,l,h=i.rectPlotX/Math.PI*180;null===o.align&&(s=h>20&&160>h?"left":h>200&&340>h?"right":"center",o.align=s),null===o.verticalAlign&&(l=45>h||h>315?"bottom":h>135&&225>h?"top":"middle",o.verticalAlign=l),e.alignDataLabel.call(this,i,a,o,n,r)}else t.call(this,i,a,o,n,r)})),f(o,"getCoordinates",function(t,i){var a=this.chart,e={xAxis:[],yAxis:[]};return a.polar?n(a.axes,function(t){var o=t.isXAxis,n=t.center,r=i.chartX-n[0]-a.plotLeft,s=i.chartY-n[1]-a.plotTop;e[o?"xAxis":"yAxis"].push({axis:t,value:t.translate(o?Math.PI-Math.atan2(r,s):Math.sqrt(Math.pow(r,2)+Math.pow(s,2)),!0)})}):e=t.call(this,i),e})}()});