
export const Koefisien = {
    template: `
        <div class="col">

            <table class="table tabel-input table-bordered text-center">
                <thead>
                    <tr>
                        <th scope="col">X</th>
                        <th scope="col" class="align-middle">Y</th>
                        <th scope="col" class="align-middle">
                            <button class="btn btn-success btn-sm btn-add-row">
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
            <button class="btn btn-primary btn-hasil">Hasil</button>

            <div class="jawaban text-center d-none">
                <hr>
                <div class="alert alert-danger d-none" role="alert">
                    A simple danger alert—check it out!
                </div>
                <div class="jawaban-benar d-none">

                    <!-- cara 1 -->
                    <span>Cara 1 : </span>
                    <p>
                        x&#772; = <span class="x-bar">x-bar</span>
                    </p>
                    <p>
                        Y bar = <span class="y-bar">y bar</span>
                    </p>
                    <div class="table-responsive">
                        <table class="table tabel-jawab-1">
                            <thead>
                                <tr>
                                    <th scope="col">X - x&#772; (x)</th>
                                    <th scope="col">Y - Y bar (y)</th>
                                    <th scope="col">x<sup>2</sup></th>
                                    <th scope="col">y<sup>2</sup></th>
                                    <th scope="col">xy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="d-none">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p class="border border-primary p-2">
                        r = &sum;X<sub>i</sub>Y<sub>i</sub> / (&radic;X<sub>i</sub><sup>2</sup>)
                        (&radic;Y<sub>i</sub><sup>2</sup>)
                    </p>
                    <p>
                        r = <span class="sigma_xy">sigma xy</span> / (&radic;<span
                            class="sigma_x_2">X2</span>)
                        (&radic;<span class="sigma_y_2">y2</span>)
                    </p>
                    <p class="font-weight-bold">
                        r = <span class="r">0</span>
                    </p>

                    <!-- cara 2 -->
                    <span>Cara 2 : </span>
                    <p>
                        &sum;X = <span class="sigma_X">sum x</span>
                    </p>
                    <p>
                        &sum;Y = <span class="sigma_Y">sum y</span>
                    </p>
                    <div class="table-responsive">
                        <table class="table tabel-jawab-2">
                            <thead>
                                <tr>
                                    <th scope="col">X<sup>2</sup></th>
                                    <th scope="col">Y<sup>2</sup></th>
                                    <th scope="col">XY</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="d-none">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="border border-primary p-2">
                        r = n . &sum;XY - (&sum;X &sum;Y) / (&radic;n. &sum;X<sup>2</sup> -
                        (&sum;X)<sup>2</sup>)(&radic;n . &sum;Y<sup>2</sup> -
                        (&sum;Y)<sup>2</sup>)
                    </p>
                    <p>
                        r = <span class="n">n</span>(<span class="sigma-XY">sigmaXY</span>) - (<span
                            class="sigma_X">sigma X</span> . <span class="sigma_Y">sigma Y</span>) /
                        (&radic; <span class="n">n</span> (<span class="sigma_X_2">sigma X2</span>) - (<span
                            class="sigma_X">sigma X</span>)<sup>2</sup>) (&radic; <span class="n">n</span>
                        (<span class="sigma_Y_2">sigma Y2</span>) - (<span class="sigma_Y">sigma
                            Y</span>)<sup>2</sup>)
                    </p>
                    <p>
                        r = <span class="n-sigma-XY">n sigmaXY</span> - <span class="sig_X_sig_Y">sig x
                            Y</span> /
                        (&radic; <span class="n_sig_X_2-sig_x_2">sigma X2</span>)
                        (&radic; <span class="n_sig_Y_2-sig_y_2">sigma Y2</span>)
                    </p>
                    <p class="font-weight-bold">
                        r = <span class="r-cara-2">0</span>
                    </p>
                </div>
            </div>
        </div>
    `,
    mounted() {
        // tambah baris
        $('.btn-add-row').click(function () {
            tambah_baris($('.tabel-input'));
        });

        // hapus baris
        $('.x-row').click(function () {
            hapus_baris($(this));
        });

        $('.btn-hasil').click(function () {
            $('.jawaban').removeClass('d-none');

            $('.tabel-jawab-1 .tr').remove();
            $('.tabel-jawab-2 .tr').remove();

            let $bool_baris = false;
            let $bool_angka = true;

            // cari nilai x bar dan y bar
            let $sigma_X = 0, $sigma_Y = 0;
            $('.tabel-input').find('.tr').each(function () {
                $bool_baris = true;
                let $td = $(this).find('td');
                let $X = $td.eq(0).text();
                let $Y = $td.eq(1).text();

                $X = $X.trim();
                $Y = $Y.trim();

                if ($X == "" || $Y == "") {
                    $bool_angka = false;
                    return;
                }

                if (!$X.match($number) || !$Y.match($number)) {
                    $bool_angka = false;
                    return;
                }

                $X = parseFloat($X);
                $Y = parseFloat($Y);

                $sigma_X = $sigma_X + $X;
                $sigma_Y = $sigma_Y + $Y;
            });

            // cek keberadaan baris
            if (!$bool_baris) {
                $('.jawaban-benar').addClass('d-none');
                $('.alert').removeClass('d-none');
                $('.alert').text('Silahkan tambah data');
                return;
            }
            // cek keabsahan inputan data
            if (!$bool_angka) {
                $('.jawaban-benar').addClass('d-none');
                $('.alert').removeClass('d-none');
                $('.alert').text('Mohon masukan data dengan benar! Data tidak boleh kosong dan harus berupa angka!!!');
                return;
            }

            // ambil jumlah baris data pada tabel input 
            let $banyak_kelas = $('.tabel-input').find('.tr').length;
            let $baris_baru = $banyak_kelas + 1;

            let $X_bar = $sigma_X / $banyak_kelas;
            let $Y_bar = $sigma_Y / $banyak_kelas;

            // cetak nilai x bar dan y bar
            // cara 1
            $('.x-bar').text($X_bar);
            $('.y-bar').text($Y_bar);
            // cara 2
            $('.sigma_X').text($sigma_X);
            $('.sigma_Y').text($sigma_Y);

            // tambah baris pada tabel-jawab
            for (let i = 0; i < $baris_baru; i++) {
                tambah_baris($('.tabel-jawab-1'));
                tambah_baris($('.tabel-jawab-2'))
            }

            // memasukan hasil dari tabel input ke dalam tabel jawab cara 1
            let $sigma_x = 0,
                $sigma_y = 0,
                $sigma_x_2 = 0,
                $sigma_y_2 = 0,
                $sigma_xy = 0;

            $('.tabel-jawab-1').find('.tr').each(function (i, e) {
                let $i_jawaban = i;
                let $td = $(this).find('td');
                // console.log(i);
                if (i == $banyak_kelas) {
                    $td.eq(0).text($sigma_x);
                    $td.eq(1).text($sigma_y);
                    $td.eq(2).text($sigma_x_2);
                    $td.eq(3).text($sigma_y_2);
                    $td.eq(4).text($sigma_xy);
                    $(this).addClass('alert-success');
                }
                else {
                    let $x = 0;
                    let $y = 0;
                    let $x_2 = 0;
                    let $y_2 = 0;
                    let $xy = 0;
                    $('.tabel-input').find('.tr').each(function (i) {
                        let $td_input = $(this).find('td');
                        if ($i_jawaban == i) {

                            let $X = parseFloat($td_input.eq(0).text());
                            let $Y = parseFloat($td_input.eq(1).text());

                            $x = $X - $X_bar;
                            $y = $Y - $Y_bar;
                            $x_2 = Math.pow($x, 2);
                            $y_2 = Math.pow($y, 2);
                            $xy = $x * $y;

                            // sigma
                            $sigma_x = $sigma_x + $x;
                            $sigma_y = $sigma_y + $y;
                            $sigma_x_2 = $sigma_x_2 + $x_2;
                            $sigma_y_2 = $sigma_y_2 + $y_2;
                            $sigma_xy = $sigma_xy + $xy;
                        }

                    });

                    $td.eq(0).text($x);
                    $td.eq(1).text($y);
                    $td.eq(2).text($x_2);
                    $td.eq(3).text($y_2);
                    $td.eq(4).text($xy);
                }
            });

            let $r = $sigma_xy / (Math.sqrt($sigma_x_2) * Math.sqrt($sigma_y_2));
            if (isNaN($r)) {
                $r = 0;
            }

            $('.sigma_xy').text($sigma_xy);
            $('.sigma_x_2').text($sigma_x_2);
            $('.sigma_y_2').text($sigma_y_2);
            $('.r').text($r);

            // memasukan hasil dari tabel input ke dalam tabel jawab cara 2
            let $sigma_X_2 = 0,
                $sigma_Y_2 = 0,
                $sigma_XY = 0;
            $('.tabel-jawab-2').find('.tr').each(function (i, e) {
                let $i_jawaban = i;
                let $td = $(this).find('td');
                // console.log(i);
                if (i == $banyak_kelas) {
                    $td.eq(0).text($sigma_X_2);
                    $td.eq(1).text($sigma_Y_2);
                    $td.eq(2).text($sigma_XY);
                    $(this).addClass('alert-success');
                }
                else {
                    let $X_2 = 0;
                    let $Y_2 = 0;
                    let $XY = 0;
                    $('.tabel-input').find('.tr').each(function (i) {
                        let $td_input = $(this).find('td');
                        if ($i_jawaban == i) {

                            let $X = parseFloat($td_input.eq(0).text());
                            let $Y = parseFloat($td_input.eq(1).text());


                            $X_2 = Math.pow($X, 2);
                            $Y_2 = Math.pow($Y, 2);
                            $XY = $X * $Y;

                            // sigma
                            $sigma_X_2 = $sigma_X_2 + $X_2;
                            $sigma_Y_2 = $sigma_Y_2 + $Y_2;
                            $sigma_XY = $sigma_XY + $XY;
                        }

                    });

                    $td.eq(0).text($X_2);
                    $td.eq(1).text($Y_2);
                    $td.eq(2).text($XY);
                }
            });

            let $n_sigma_XY = $banyak_kelas * $sigma_XY;
            let $sig_X_sig_Y = $sigma_X * $sigma_Y;
            let $n_sig_X_2_sig_x_2 = ($banyak_kelas * $sigma_X_2) - Math.pow($sigma_X, 2);
            let $n_sig_Y_2_sig_y_2 = ($banyak_kelas * $sigma_Y_2) - Math.pow($sigma_Y, 2);

            let $r_cara_2 = (($n_sigma_XY) - ($sig_X_sig_Y)) / (Math.sqrt($n_sig_X_2_sig_x_2) * Math.sqrt($n_sig_Y_2_sig_y_2));

            if (isNaN($r_cara_2)) {
                $r_cara_2 = 0;
            }

            $('.n').text($banyak_kelas);
            $('.sigma-XY').text($sigma_XY);
            $('.sigma_X_2').text($sigma_X_2);
            $('.sigma_Y_2').text($sigma_Y_2);
            $('.n-sigma-XY').text($n_sigma_XY);
            $('.sig_X_sig_Y').text($sig_X_sig_Y);
            $('.n_sig_X_2-sig_x_2').text($n_sig_X_2_sig_x_2);
            $('.n_sig_Y_2-sig_y_2').text($n_sig_Y_2_sig_y_2);

            $('.r-cara-2').text($r_cara_2);


            $('.jawaban-benar').removeClass('d-none');
            $('.alert').addClass('d-none');
        });

    }
}