// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}



var labels = []
var data = []

GraficoTabela.forEach(o=>{

  labels.push(o.NomeDoConteudo)
  data.push(o.AvaliacaoUsuario)
  

})




// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223)",
      borderColor: "rgba(78, 115, 223)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223)",
      pointHoverBorderColor: "rgba(78, 115, 223)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: data,
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(255, 159, 64)',
        'rgba(255, 205, 86)',
        'rgba(75, 192, 192)',
        'rgba(54, 162, 235)',
        'rgba(153, 102, 255)',
        'rgba(201, 203, 207)',
         'rgba(173,255, 47 )',
         'rgba(255,0,255)',
         'rgba(255,105,180)'
      ],
    }],
  },
  options: {
    responsive: true,
    legend: {
      display: false
  },
    scales: {

        xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                  
                }
            }],
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true,
                
                    
                    max: 5
                }
            }]
    },
   
}
});
