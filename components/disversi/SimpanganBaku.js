

export const SimpanganBaku = {
    template: `
        <div class="col-md-12">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#simpangan-baku" aria-expanded="true"
                                aria-controls="simpangan-baku">
                                Simpangan Baku
                            </button>
                        </h5>
                    </div>
                    <div id="simpangan-baku" class="collapse" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Masukan Data</label>
                                    <textarea class="form-control input-simpangan-baku"
                                        id="exampleFormControlTextarea1" rows="5"
                                        placeholder="Contoh: 1,2,3,4,5.6 (tanpa spasi)"></textarea>
                                </div>
                            </form>
                            <button class="btn btn-primary btn-simpangan-baku">Hasil</button>
                            <div class="jawaban-simpangan-baku d-none">
                                <hr>
                                <div class="alert alert-simpangan-baku alert-danger d-none" role="alert">
                                </div>
                                <div class="jawaban-benar-simpangan-baku text-center d-none">
                                    <table id="table" class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">X</th>
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
                                    <p class="border border-primary p-2">
                                        &sigma; = &radic;(1/N (&sum;X<sub>i</sub><sup>2</sup> -
                                        ((&sum;X<sub>i</sub>)<sup>2</sup>) / N)
                                    </p>
                                    <p>
                                        &radic;(1/<span class="N">N</span> (<span
                                            class="sigma_xi_2">XI_2</span> -
                                        (<span class="sigma_xi__2">Xi__2</span>)<sup>2</sup> / <span
                                            class="N">N</span>
                                        )
                                    </p>
                                    <p>
                                        &radic;(1/<span class="N">N</span> (<span
                                            class="sigma_xi_2">XI_2</span> -
                                        <span class="sigmaxi__2">Xi__2</span> / <span class="N">N</span> )
                                    </p>
                                    <p>
                                        &radic;(1/<span class="N">N</span> (<span
                                            class="sigma_xi_2">XI_2</span> -
                                        <span class="sigmaxi__2_N">Xi__2_N</span> )
                                    </p>
                                    <p>
                                        &radic;(1/<span class="N">N</span> (<span
                                            class="sig_xi_2_N">sig_xi_2_N</span>)
                                    </p>
                                    <p>
                                        &radic;<span class="akar_sb">akar sb</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        &sigma; = <span class="SB">0</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        // simpangan baku 100,40,80,20,10,50
        $('.btn-simpangan-baku').click(function () {
            $('.jawaban-benar-simpangan-baku .tr').remove();
            $('.jawaban-simpangan-baku').removeClass('d-none');
            let $data = $('.input-simpangan-baku').val(); // ambil data dari inputan
            $data = $data.trim();

            // periksa apakah ada data atau tidak
            if (!is_data($data)) {
                $('.jawaban-benar-simpangan-baku').addClass('d-none');
                $('.alert-simpangan-baku').removeClass('d-none');
                $('.alert-simpangan-baku').text('Mohon masukan data!!!')
                return;
            }
            // pecahkan string menjadi array dan periksa banyak data
            $data = explode($data, ',');
            let $banyak_data = $data.length;
            if ($banyak_data <= 1) {
                $('.jawaban-benar-simpangan-baku').addClass('d-none');
                $('.alert-simpangan-baku').removeClass('d-none');
                $('.alert-simpangan-baku').text('Harap masukan lebih dari satu data!!!');
                return;
            }
            // periksa kelayakan data
            let $data_valid = data_valid($data);
            if ($data_valid['error']) {
                $('.jawaban-benar-simpangan-baku').addClass('d-none');
                $('.alert-simpangan-baku').removeClass('d-none');
                $('.alert-simpangan-baku').text($data_valid['mesage']);
                return;
            }
            let $pangkat_data = new Array();
            let $sigma_X = 0;
            for (let i = 0; i < $banyak_data; i++) {
                $pangkat_data[i] = Math.pow($data[i], 2);
                $sigma_X = $sigma_X + parseFloat($data[i]);
            }


            let $sigma_X2 = $pangkat_data.reduce((a, b) => a + b);

            // tabel
            for (let i = 0; i < $banyak_data + 1; i++) {
                tambah_baris($('.jawaban-benar-simpangan-baku .table'));
            }

            $('.jawaban-benar-simpangan-baku .table').find('.tr').each(function (i) {
                let $td = $(this).find('td');
                $td.eq(0).text($data[i]);
                $td.eq(1).text($pangkat_data[i]);
                if (i == $banyak_data) {
                    $td.eq(0).html("&sum;X<sub>i</sub> = " + $sigma_X);
                    $td.eq(1).html("(&sum;X<sub>i</sub>)<sup>2</sup> = " + $sigma_X2);
                    $(this).addClass('alert-success');
                }
            });

            let $sigma_x_kuadrat = Math.pow($sigma_X, 2);
            let $sigma_x_kuadrat_per_n = $sigma_x_kuadrat / $banyak_data;
            let $sig_xi_2_N = $sigma_X2 - $sigma_x_kuadrat_per_n;
            let $akar = $sig_xi_2_N / $banyak_data;
            let $SB = Math.sqrt($akar);

            $('.N').text($banyak_data);
            $('.sigma_xi_2').text($sigma_X2);
            $('.sigma_xi__2').text($sigma_X);
            $('.sigmaxi__2').text($sigma_x_kuadrat);
            $('.sigmaxi__2_N').text($sigma_x_kuadrat_per_n);
            $('.sig_xi_2_N').text($sig_xi_2_N);
            $('.akar_sb').text($akar);
            $('.SB').text($SB);

            $('.jawaban-benar-simpangan-baku').removeClass('d-none');
            $('.alert-simpangan-baku').addClass('d-none');
        });
    }
}