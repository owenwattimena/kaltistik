export const RerataBerkelompokKelasInterval = {
    template: `
        <div class="col-md-6">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                data-target="#rerata-berkelompok-interval" aria-expanded="false"
                                aria-controls="rerata-berkelompok-interval">
                                Rata-rata Data Berkelompok <small>(Kelas Interval)</small>
                            </button>
                        </h5>
                    </div>
                    <div id="rerata-berkelompok-interval" class="collapse" aria-labelledby="headingThree"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <table id="table-interval" class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col" colspan="2">X</th>
                                        <th scope="col" rowspan="2" class="align-middle">f</th>
                                        <th scope="col" rowspan="2" class="align-middle">
                                            <button class="btn btn-success btn-sm btn-table-interval-add">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>BB</th>
                                        <th>BA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="tr">
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td>
                                            <i class="fa fa-times-circle x-row-interval"></i>
                                        </td>
                                    </tr>

                                    <tr class="d-none">
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td>
                                            <i class="fa fa-times-circle x-row-interval"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-primary btn-rerata-berkelompok-interval">Hasil</button>

                            <div class="jawaban-berkelompok-interval text-center d-none">
                                <hr>
                                <div class="alert berkelompok-interval-alert alert-danger d-none"
                                    role="alert">
                                </div>

                                <div class="berkelompok-interval-jawaban-benar d-none">
                                    <table id="table-mf-interval" class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">M</th>
                                                <th scope="col">f</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="d-none">
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        x&#772; = 1 . (<span class="sig-f-interval"></span>) / <span
                                            class="n"></span>
                                    </div>

                                    <div class="text-left font-weight-bold hasil-berkelompok-interval">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        // Kelas Interval
        var $TABLE = $('#table');
        var $table_interval = $('#table-interval');
        let $tabel_mf_interval = $('#table-mf-interval');

        $('.btn-rerata-berkelompok-interval').click(function () {
            $('#table-mf-interval .tr').remove();
            $('.jawaban-berkelompok-interval').removeClass('d-none');
            let $bool_baris = false;
            let $bool_angka = true;
            $table_interval.find('tbody .tr').each(function (i, e) {
                $bool_baris = true;
                let $td = $(this).find('td');

                let $bb = $td.eq(0).text();
                let $ba = $td.eq(1).text();
                let $f = $td.eq(2).text();

                $bb = $bb.trim();
                $ba = $ba.trim();
                $f = $f.trim();
                // console.log($f);
                if ($bb == "" || $ba == "" || $f == "") {
                    $bool_angka = false;
                    return;
                }

                if (!$bb.match($number) || !$ba.match($number) || !$f.match($number)) {

                    $bool_angka = false;
                    return;
                }

                let $m = (parseFloat($bb) + parseFloat($ba)) / 2;
                tambah_baris($tabel_mf_interval);
                let $td1 = $("#table-mf-interval tr:last").find('td');
                let $mi = $td1.eq(0).text($m);
                let $fi = $td1.eq(1).text($f);



            });

            if (!$bool_baris) {
                $('.berkelompok-interval-alert').removeClass('d-none');
                $('.berkelompok-interval-jawaban-benar').addClass('d-none');
                $('.berkelompok-interval-alert').text('Silahkan tambah data!!!');
            }



            let $total = 0;
            let $n = 0;
            $tabel_mf_interval.find('tbody .tr').each(function (i, e) {
                let $td_mf = $(this).find('td');
                let $m_j = $td_mf.eq(0).text(); //data M pada tabel jawaban M f
                let $f_j = $td_mf.eq(1).text(); //data f pada tabel jawaban M f
                $m_j = $m_j.trim();
                $f_j = $f_j.trim();

                $total = $total + (parseFloat($m_j) * parseFloat($f_j));
                $n = $n + parseFloat($f_j);
            });

            let $hasil = $total / $n;

            if (!isNaN($hasil)) {
                $('.jawaban-berkelompok-interval').removeClass('d-none');
                $('.berkelompok-interval-alert').addClass('d-none');
                $('.berkelompok-interval-jawaban-benar').removeClass('d-none');
            }
            if (!$bool_angka) {
                $('.berkelompok-interval-alert').removeClass('d-none');
                $('.berkelompok-interval-jawaban-benar').addClass('d-none');
                $('.berkelompok-interval-alert').text('Mohon masukan data dengan benar! Data tidak boleh kosong dan harus berupa angka!!!');
            }

            $('.sig-f-interval').text($total);
            $('.berkelompok-interval-jawaban-benar .n').text($n);

            $('.hasil-berkelompok-interval').html('Jawaban : x&#772; = ' + $hasil);
        });
        // end of Kelas Interval
    }
}