const trumpURL=`https://projects.fivethirtyeight.com/trump-approval-data/approval_topline.csv`;
const trumpLocal= "approval_topline.csv";

    const w = (document.getElementById('container').clientWidth)*.9;
    const h = 450;
    
    // D3 STANDARD APPROVAL RENDERING
    const chartRender = (data, id, div, width, height, measure, color)=>{
        const filtered = data.filter(data => data.subgroup == "All polls");
        d3.select(div)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .selectAll("circle")
            .data(filtered)
            .enter()
            .append("circle")
            .attr("class", d => id + '_' + d.subgroup)
            .attr("id", d => id + '_' + d.modeldate)
            .attr("cx", (d,i) => {
                return (i * (data.length / w));
            })
            .attr("cy", (d) => {
                const meas = eval( 'd.' + measure);
                return ((100-meas) * (h/100));
            })
            .attr("r", d => 2 )
            .style("fill", d => color)
    };

    // DATA PROCESSING: RAW CSV > JSON > TRIGGER D3 RENDERING
    const trumpCSV = d3.csv(trumpURL, data =>{
        return{
            subgroup: data.subgroup,
            old_date: data.modeldate,
            modeldate: new Date(data.modeldate),
            approve_estimate: data.approve_estimate,
            disapprove_estimate: data.disapprove_estimate
        }
        })
        .then(data =>{
            return data.sort((a, b) => a.modeldate - b.modeldate);
        }).then(data =>{
            console.log(1*(w/data.length))
            chartRender(data, 'approve', "#approval", w, h, 'approve_estimate', 'red');
            chartRender(data, 'disapprove', "#disapproval", w, h, 'disapprove_estimate', 'blue');
        });
/*
todo: add in axis's
todo: add in news api > get nyt and fox news > filter for jumps in data (most popular for that week)
todo: allow for chart to resize
todo: allow for different subgroups to be shown (make a lighter color)
todo: hover 'circles' to get information (date, subgroup, rating, )
*/