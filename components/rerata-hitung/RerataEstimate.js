export const RerataEstimate = {
    template: `
        <div class="col-md-6">

            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                data-target="#rerata-perkiraan" aria-expanded="false"
                                aria-controls="rerata-perkiraan">
                                Rata-rata Perkiraan (Estimasi)
                            </button>
                        </h5>
                    </div>
                    <div id="rerata-perkiraan" class="collapse" aria-labelledby="headingThree"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Data</span>
                                </div>
                                <input type="text" class="input-data-estimate form-control"
                                    placeholder="Contoh : 1,2,3,4,5,6.5 (tanpa spasi)">
                            </div>
                            <button class="btn btn-primary btn-estimate">Hasil</button>

                            <div class="jawaban-estimate text-center d-none">
                                <hr>
                                <div class="alert estimate-alert alert-danger d-none" role="alert">
                                    inputan salah!!!
                                </div>
                                <div class="estimate-jawaban-benar d-none">
                                    <div>
                                        x&#772; = 1 . (<span class="sig-x-estimate"></span>) / <span
                                            class="n"></span>
                                    </div>

                                    <div class="text-left font-weight-bold hasil-estimate"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        // rerata estimate
        $('.btn-estimate').click(function () {
            rata_rata_hitung('.input-data-estimate', '.estimate-alert', '.sig-x-estimate', '.n', '.hasil-estimate', '.jawaban-estimate', '.estimate-jawaban-benar', 'x&#772;');
        })
    }
}