(function(){function square(a){return a*a}function getDistanceFunction(point,fn){return function(obj){return fn(point,obj)}}function distSquared(p1,p2){return square(p2.x-p1.x)+square(p2.y-p1.y)}function distToLineSquared(p1,l1,l2){var dot=(p1.x-l1.x)*(l2.x-l1.x)+(p1.y-l1.y)*(l2.y-l1.y),ratio=dot/distSquared(l1,l2);if(ratio<0)return distSquared(p1,l1);if(ratio>1)return distSquared(p1,l2);return distSquared(p1,{x:l1.x+ratio*(l2.x-l1.x),y:l1.y+ratio*(l2.y-l1.y)})}function nodeDistanceSquared(point,node){node={x:node.x,y:node.y};return distSquared(point,node)}function linkDistanceSquared(point,link){var nodes=this.data().nodes,from={x:nodes[link.from].x,y:nodes[link.from].y},to={x:nodes[link.to].x,y:nodes[link.to].y};return distToLineSquared(point,from,to)}var target=function(g){g.prototype.target=function(point,type){type=type||g.NODES;if(type==g.LINKS)return this.targetLink(point);else return this.targetNode(point)};g.prototype.targetNode=function(point){var node=-1,isTarget=function(n,i){var found=nodeDistanceSquared(point,n)<=square(n.r);if(found)node=i;return!found};this.data().nodes.every(isTarget);return node};g.prototype.targetLink=function(point){var link=-1,lineWidth=this.renderer.lineWidth,d=linkDistanceSquared.bind(this),isTarget=function(l,i){var found=d(point,l)<=square(lineWidth);if(found)link=i;return!found};this.data().links.every(isTarget);return link};g.prototype.nearest=function(point,type,options){type=type||g.NODES;if(type==g.LINKS)return this.nearestLink(point,options);else return this.nearestNode(point,options)};g.prototype.nearestNode=function(point,options){var d=options&&options.d||nodeDistanceSquared;var count=options&&options.count||1;var dataPoint=this.getDataPosition(point),distances=[],sorted=[];d=getDistanceFunction(dataPoint,d);this.data().nodes.forEach(function(n,i){var dist=d(n);var index=g.utils.sortedIndex(distances,dist);distances.splice(index,0,dist);sorted.splice(index,0,i)});var nearest=sorted.slice(0,count);return nearest};g.prototype.nearestLink=function(point,options){var d=options&&options.d||linkDistanceSquared.bind(this);var count=options&&options.count||1;var dataPoint=this.getDataPosition(point),distances=[],sorted=[];d=getDistanceFunction(dataPoint,d);this.data().links.forEach(function(l,i){var dist=d(l);var index=g.utils.sortedIndex(distances,dist);distances.splice(index,0,dist);sorted.splice(index,0,i)});var nearest=sorted.slice(0,count);return nearest}};if(typeof module!=="undefined"&&module.exports)module.exports=target;else target(Grapher)})();