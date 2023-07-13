
function calculate(nr_receipts, items) {
    var total_a = 0, total_o = 0;
    var a_pays_o = 0, o_pays_a = 0;
    for (let r =0; r<nr_receipts; r++){
        sub_total = 0;
        sub_total_text = document.getElementById('subtotal'+r);
        if(document.querySelector('input[name="paid'+r+'"]:checked').value == 'a'){
            for(let i of items[r]){
                var qt = document.getElementById('quantity'+i).value,
                price = document.getElementById('price'+i).value,
                i_for = document.querySelector('input[name="for'+i+'"]:checked').value;
                price = price * qt;
                item_total_price = document.getElementById('item_total_price'+i);
                item_total_price.innerHTML = price;
                sub_total += price;
                switch(i_for){
                    case 'o':
                        total_o += price;
                        o_pays_a += price;
                        break;
                    case 'a':
                        total_a += price;
                        break;

                    case 'b':
                        h = price*.5;
                        total_a += h;
                        o_pays_a += h;
                        total_o += h;
                }
            }
        } else {
            for(let i of items[r]){
                var qt = document.getElementById('quantity'+i).value,
                price = document.getElementById('price'+i).value,
                i_for = document.querySelector('input[name="for'+i+'"]:checked').value;
                item_total_price = document.getElementById('item_total_price'+i);
                price = price * qt;
                item_total_price.innerHTML = price;

                sub_total += price;
                switch(i_for){
                    case 'o':
                        total_o += price;
                        break;
                    case 'a':
                        total_a += price;
                        a_pays_o += price;
                        break;

                    case 'b':
                        h = price*.5;
                        total_o += h;
                        a_pays_o += h;
                        total_a += h;
                }
            }

        }
        sub_total_text.innerHTML = sub_total.toFixed(2);

    }
    update_total(total_a, total_o, a_pays_o, o_pays_a)
}

function update_total(total_a, total_o, a_pays_o, o_pays_a) {
    total_a = total_a.toFixed(2);
    total_o = total_o.toFixed(2);    
    document.getElementById("total_a").innerHTML = total_a;
    document.getElementById("total_o").innerHTML = total_o;
    if (a_pays_o > o_pays_a){
        document.getElementById("resolution").innerHTML = 'A pays O';
        document.getElementById("total_resolution").innerHTML = (a_pays_o - o_pays_a).toFixed(2);
    } else if (a_pays_o < o_pays_a){
        document.getElementById("resolution").innerHTML = 'O pays A';
        document.getElementById("total_resolution").innerHTML =( o_pays_a - a_pays_o).toFixed(2);
    } else {
        document.getElementById("resolution").innerHTML = 'All equal!';
        document.getElementById("total_resolution").innerHTML = '';
    }
}

$(document).ready(function() {
    $('.image-container').mousemove(function(e) {
      var containerOffset = $(this).offset();
      var x = (e.pageX - containerOffset.left) / $(this).width();
      var y = (e.pageY - containerOffset.top) / $(this).height();

      $(this).find('img').css({
        'transform-origin': (x * 100) + '% ' + (y * 100) + '%'
      });
    });
  });
