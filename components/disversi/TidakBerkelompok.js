

export const TidakBerkelompok = {
    template: `
        <div class="col-sm-6">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Data Tidak Berkelompok
                            </button>
                        </h5>
                    </div>
                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Masukan Data</label>
                                    <textarea class="form-control input-data"
                                        id="exampleFormControlTextarea1" rows="5"
                                        placeholder="Contoh: 1,2,3,4,5.6 (tanpa spasi)"></textarea>
                                </div>
                            </form>
                            <button class="btn btn-primary btn-tak-berkelompok">Hasil</button>
                            <div class="jawaban-tak-berkelompok d-none">
                                <hr>
                                <div class="alert alert-tak-berkelompok alert-danger d-none" role="alert">
                                </div>
                                <div class="jawaban-benar-tak-berkelompok text-center d-none">
                                    <div class="card card-data mb-3">
                                        <div class="card-header">
                                            Data
                                        </div>
                                        <div class="card-body text-left data-distribusi-f">
                                            <span class="data"></span>
                                        </div>
                                    </div>
                                    <span>Nilai Jarak</span>
                                    <p class="border border-primary p-2">
                                        NJ = X<sub>n</sub> - X<sub>1</sub>
                                    </p>
                                    <p>
                                        NJ = <span class="Xn">Xn</span> - <span class="x_satu">X1</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        NJ = <span class="NJ">NJ</span>
                                    </p>
                                    <span>Rata-rata Simpangan</span>
                                    <p class="border border-primary p-2">
                                        RS = 1/n (&Sigma; |X<sub>i</sub> - x&#772;|)
                                    </p>
                                    <p>
                                        RS = 1 / <span class="n">n</span> ( <span
                                            class="X-i-min-X-bar">XiXbar</span> )
                                    </p>
                                    <p>
                                        1 / <span class="n">n</span> ( <span
                                            class="Xi-min-Xbar">XiXbar</span> )
                                    </p>
                                    <p class="font-weight-bold">
                                        RS = <span class="RS">RS</span>
                                    </p>
                                    <span>Simpangan terhadap Median</span>
                                    <p class="border border-primary p-2">
                                        RS = 1/n (&Sigma; |X<sub>i</sub> - Med|)
                                    </p>
                                    <p>
                                        RS = 1 / <span class="n">n</span> ( <span
                                            class="X-i-min-Med">XiMed</span> )
                                    </p>
                                    <p>
                                        1 / <span class="n">n</span> ( <span class="Xi-min-Med">XiMed</span>
                                        )
                                    </p>
                                    <p class="font-weight-bold">
                                        RS = <span class="RS-Med">RS</span>
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
        $('.btn-tak-berkelompok').click(function () {
            $('.jawaban-tak-berkelompok').removeClass('d-none');
            let $data = $('.input-data').val(); // ambil data dari inputan
            $data = $data.trim();

            // periksa apakah ada data atau tidak
            if (!is_data($data)) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text('Mohon masukan data!!!')
                return;
            }
            // pecahkan string menjadi array dan periksa banyak data
            $data = explode($data, ',');
            let $banyak_data = $data.length;
            if ($banyak_data <= 1) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text('Harap masukan lebih dari satu data!!!');
                return;
            }
            // periksa kelayakan data
            let $data_valid = data_valid($data);
            if ($data_valid['error']) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text($data_valid['mesage']);
                return;
            }
            $data = $data.sort(function (a, b) { return a - b }); //urutkan data secara ascesnding
            $('.data').text($data); //tampilkan data pada card data

            // Nilai jarak
            let $X_satu = $data[0];
            let $X_n = $data[$banyak_data - 1]; //nilai dari X ke-n (data ke -n)
            let $NJ = $X_n - $X_satu;

            // Rata-rata Simpangan
            let $x_bar = rata_rata($data);

            let text_xi_x_bar = "";
            let $abs_Xi_Xbar = 0;
            for (let i = 0; i < $banyak_data; i++) {

                $abs_Xi_Xbar = $abs_Xi_Xbar + (Math.abs($data[i] - $x_bar));

                if ($banyak_data - 1 != i) {
                    text_xi_x_bar += "|" + $data[i] + ' - ' + $x_bar + '| + ';
                }
                else {
                    text_xi_x_bar += "|" + $data[i] + ' - ' + $x_bar + '|';
                }
            }
            let $RS = $abs_Xi_Xbar / $banyak_data;

            // Simpangan terhadap Median
            let $med = median($data);
            let text_xi_med = "";
            let $abs_Xi_med = 0;
            for (let i = 0; i < $banyak_data; i++) {
                $abs_Xi_med = $abs_Xi_med + (Math.abs($data[i] - $med));

                if ($banyak_data - 1 != i) {
                    text_xi_med += "|" + $data[i] + ' - ' + $med + '| + ';
                }
                else {
                    text_xi_med += "|" + $data[i] + ' - ' + $med + '|';
                }
            }
            let $RS_med = $abs_Xi_med / $banyak_data;


            $('.Xn').text($X_n);
            $('.x_satu').text($X_satu);
            $('.NJ').text($NJ);

            $('.n').text($banyak_data);
            $('.X-i-min-X-bar').text(text_xi_x_bar);
            $('.Xi-min-Xbar').text($abs_Xi_Xbar);
            $('.RS').text($RS);

            $('.X-i-min-Med').text(text_xi_med);
            $('.Xi-min-Med').text($abs_Xi_med);
            $('.RS-Med').text($RS_med);

            $('.jawaban-benar-tak-berkelompok').removeClass('d-none');
            $('.alert-tak-berkelompok').addClass('d-none');

            // data : 50,40,30,60,70
        });
    }
}