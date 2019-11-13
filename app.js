
const getdata = url =>{
    fetch(url)
    .then(response => {
        if(response.ok){
            response.json();
        }else{
            return Promise.reject.apply(response);
        }
    }).then(data =>{
        return data;
    }).catch(err =>{
        console.log("Error logged: ", err);
    });
};

const trumpURL=`https://projects.fivethirtyeight.com/trump-approval-data/approval_topline.csv`;
const trumpLocal= "approval_topline.csv";

    const w = 1000;
    const h = 450;
    const svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);


    const approvalCircles = data =>{
                    svg.selectAll("circle")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("class", d => `approve ${d.subgroup}`)
                        .attr("id", d => "approve_" + d.modeldate)
                        .attr("cx", (d,i) => i * 5 )
                        .attr("cy", d => (d.approve_estimate/100) * 450 )
                        .attr("r", d => 2 )
                        .style("fill", d => "red");

                    svg.selectAll("circle")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("class", "disapprove")
                        .attr("id", d => "disapprove_" + d.modeldate)
                        .attr("cx",(d, i) => (i * 2) + 100 )
                        .attr("cy", d => d.disapprove_estimate  )
                        .attr("r", d => 2 )
                        .style("fill", d => "blue");
        };

    d3.csv(trumpLocal).then(data =>{
        approvalCircles(data);
    })
console.log('data')