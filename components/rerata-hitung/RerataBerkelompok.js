import { Mixin } from '../../mixin/Mixin.js'

export const RerataBerkelompok = {
    mixins: [
        Mixin
    ],
    template: `
        <div class="col-md-6">

            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                data-target="#rerata-berkelompok" aria-expanded="false"
                                aria-controls="rerata-berkelompok">
                                Rata-rata Data Berkelompok
                            </button>
                        </h5>
                    </div>
                    <div id="rerata-berkelompok" class="collapse" aria-labelledby="headingThree"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <table id="table" class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">X</th>
                                        <th scope="col">f</th>
                                        <th scope="col">
                                            <button class="btn btn-success btn-sm btn-table-add">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="tr">
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td>
                                            <i class="fa fa-times-circle x-row"></i>
                                        </td>
                                    </tr>

                                    <tr class="d-none">
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td>
                                            <i class="fa fa-times-circle x-row"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-primary btn-rerata-berkelompok">Hasil</button>

                            <div class="jawaban-berkelompok text-center d-none">
                                <hr>
                                <div class="alert berkelompok-alert alert-danger d-none" role="alert">
                                </div>
                                <div class="berkelompok-jawaban-benar d-none">
                                    <div>
                                        x&#772; = 1 . (<span class="sig-fx"></span>) / <span
                                            class="n"></span>
                                    </div>
                                    <div class="text-left font-weight-bold hasil-berkelompok"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        /*
        ****Rerata hitung data berkelompok
        */



        $('.btn-rerata-berkelompok').click(function () {
            $('.jawaban-berkelompok').removeClass('d-none');
            let $total = 0;
            let $n = 0;
            let $bool_angka = true;
            $TABLE.find('tbody .tr').each(function (i, e) {
                let $td = $(this).find('td');
                let $x = $td.eq(0).text();
                let $f = $td.eq(1).text();
                $x = $x.trim();
                $f = $f.trim();
                if ($x == "" || $f == "") {
                    $bool_angka = false;
                    return;
                }
                else {
                    if (!$x.match($number) || !$f.match($number)) {
                        $bool_angka = false;
                        return;
                    } else {

                        $total = $total + (parseFloat($x) * parseFloat($f));
                        $n = $n + parseFloat($f);
                    }
                }
            });
            let $hasil = $total / $n;
            if (!isNaN($hasil)) {
                $('.jawaban-berkelompok').removeClass('d-none');
                $('.berkelompok-alert').addClass('d-none');
                $('.berkelompok-jawaban-benar').removeClass('d-none');
            }
            if (!$bool_angka) {
                $('.berkelompok-alert').removeClass('d-none');
                $('.berkelompok-jawaban-benar').addClass('d-none');
                $('.berkelompok-alert').text('Mohon masukan data dengan benar! Data tidak boleh kosong dan harus berupa angka!!!');
            }

            $('.sig-fx').text($total);
            $('.berkelompok-jawaban-benar .n').text($n);

            $('.hasil-berkelompok').html('Jawaban : x&#772; = ' + $hasil);
        });
    }
}