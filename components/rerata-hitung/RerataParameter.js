export const RerataParameter = {
    template: `
        <div class="col-md-6">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingThree">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                data-target="#rerata-sebenarnya" aria-expanded="false"
                                aria-controls="rerata-sebenarnya">
                                Rata-rata Sebenarnya (Parameter)
                            </button>
                        </h5>
                    </div>
                    <div id="rerata-sebenarnya" class="collapse" aria-labelledby="headingThree"
                        data-parent="#accordionExample">
                        <div class="card-body data-parameter">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Data</span>
                                </div>
                                <input type="text" class="input-data-parameter form-control"
                                    placeholder="Contoh : 1,2,3,4,5,6.5 (tanpa spasi)">
                            </div>
                            <button class="btn btn-primary btn-parameter">Hasil</button>
                            <div class="jawaban-parameter text-center d-none">
                                <hr>
                                <div class="alert parameter-alert alert-danger d-none" role="alert"></div>
                                <div class="parameter-jawaban-benar d-none">
                                    <div>
                                        &mu; = 1 . (<span class="sig-x-parameter"></span>) / <span
                                            class="N"></span>
                                    </div>

                                    <div class="text-left font-weight-bold hasil-parameter"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `,
    mounted() {
        // rerata parameter
        $('.btn-parameter').click(function () {
            rata_rata_hitung('.input-data-parameter', '.parameter-alert', '.sig-x-parameter', '.N', '.hasil-parameter', '.jawaban-parameter', '.parameter-jawaban-benar', '&mu;');
        })
    }
}