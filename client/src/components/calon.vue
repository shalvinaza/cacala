<template>
  <div class="container">
        <div class="row d-flex m-1">
            <div class="flex-row justify-content-center text-center">
                <h5 class="bold justify-content-start mb-4 mt-4">Daftar Calon</h5>
            </div>
            <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Calon</h6>
                <form @submit.prevent="addCalon" class="mt-4"> 
                    <div class="d-flex flex-row">
                        <h6 class="me-3">Pilih admin : </h6>
                        <div class="dropdown mb-4">
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih Admin
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="admin in admins" :key="admin.username" @click="calon.id_admin = admin.id_admin; namaAdmin = admin.username" v-show="!admin.chosen && admin.role !== 'super'"><button class="dropdown-item" type="button">{{admin.username}}</button></li>
                            </ul>
                            <span v-if="calon.id_admin">{{namaAdmin}}</span>
                        </div> 
                    </div>             

                    <div class="dropdown mb-4">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih jabatan : </h6>
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih Jabatan
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="jab in jabatan" :key="jab.jabatan" @click="calon.id_jabatan = jab.id_jabatan; namaJabatan = jab.jabatan_tujuan"><button class="dropdown-item" type="button">{{jab.jabatan_tujuan}}</button></li>
                            </ul>
                            <span v-if="calon.id_jabatan"> {{namaJabatan}}</span>
                        </div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Nomor Urut</span> 
                        <input id="no_urut" autocomplete="off" type="text" v-model="calon.no_urut" v-bind:class="{'form-control':true, 'is-invalid' : !validNomor(calon.no_urut) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nomor urut disini">
                        <div class="invalid-feedback">Nomor urut tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-3">  
                        <span>Nama Calon</span> 
                        <input id="nama" autocomplete="off" type="text" v-model="calon.nama" v-bind:class="{'form-control':true, 'is-invalid' : !validasiNama(calon.nama) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama calon disini">
                        <div class="invalid-feedback">Nama calon tidak boleh kosong</div>
                    </div>
                    <div class="d-flex flex-column mb-4">
                        <div>
                            <input type="file" id="inputFoto" style="display:none" ref="fotoCalon" @change="selectImage()"/>
                            <button class="btn bg-light-orange br-10" @click="addFoto()">Pilih foto</button>
                            <span class="ms-2" v-if="calon.foto">{{calon.foto.name}}</span>
                            <span class="ms-2" v-if="errorImg" style="color:red">- {{message}}</span>
                        </div>
                        <div v-if="calon.foto" class="mt-3 d-flex flex-wrap">
                            <div class="fotoBorder d-flex flex-row">
                                <img :src="urlFoto" alt="preview foto" style="width:250px; height:250px">
                                <span @click="calon.foto=''; errorImg = false"><font-awesome-icon icon="fa-solid fa-xmark" class="ms-2"/></span>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
            </div>

            <div class="form-data mb-4 mt-5">
                <h6 class="bold mb-3">Tambah Detail</h6>
                <form @submit.prevent="addDetail" class="mt-4">             
                    <div class="dropdown mb-4">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih partai : </h6>
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih Partai
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="par in partai" :key="par.id_partai" @click="addPartaii.id_partai = par.id_partai; namaPartai = par.nama_partai"><button class="dropdown-item" type="button">{{par.nama_partai}}</button></li>
                            </ul>
                            <span v-if="addPartaii.id_partai">{{namaPartai}}</span>
                        </div>
                    </div>
                    <div class="dropdown mb-4" v-if="cekProv">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih daerah : </h6>
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Daerah Pilih
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                    
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li v-for="kot in kota" :key="kot.kota" @click="dapil.id_kota = kot.id_kota; dapil.id_kecamatan = null; namaDapil = kot.kota"><button class="dropdown-item" type="button">{{kot.kota}}</button></li>
                                </ul>
                            <span v-if="dapil.id_kota">{{namaDapil}}</span>
                        </div>
                    </div>
                    <div class="dropdown mb-4" v-if="cekKab">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih daerah : </h6>
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Daerah Pilih
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                           
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li v-for="kec in kecamatan" :key="kec.id_kecamatan" @click="dapil.id_kecamatan = kec.id_kecamatan; dapil.id_kota = null; namaDapil = kec.kecamatan"><button class="dropdown-item" type="button">{{kec.kecamatan}}</button></li>
                                </ul>
                         
                            <span v-if="dapil.id_kecamatan">{{namaDapil}}</span>
                        </div>
                    </div>
                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
            </div>

            <h1>{{idNewCal}} hai</h1>
            <h1>{{cekProv}} prov</h1>
            <h1>{{cekKab}} kab</h1>

            <h6 class="bold mt-4 p-0">Calon Presiden</h6>
            <table class="table mt-3" id="calonPresiden">
                <thead>
                    <tr>
                    <th scope="col">Nomor Urut</th>
                    <th scope="col">Nama Admin</th>
                    <th scope="col">Nama Calon Presiden</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Partai</th>
                    <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="pres in presiden" :key="pres.id_calon">
                        <td>{{pres.no_urut}}</td>
                        <td>{{pres.admin}}</td>
                        <td>{{pres.nama}}</td>
                        <td><img :src="pres.foto" alt="" style="width:70px; height: 70px"></td>
                        <td>
                            <span v-for="par in pres.partai" :key="par.id_partai" class="d-flex"> {{par.nama_partai}}</span>
                        </td>
                        <td>                                        
                            <span class="card-text icons me-2" @click="editCalon(pres)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                            <span class="card-text icons" @click="toggleDelCalon(pres.id_calon)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </td>
                        <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                            <div class="d-flex justify-content-end">
                                <button class="bg-light-orange2 me-2 br-10" @click="toggleDelCalon(pres.id_calon)">Tidak</button>
                                <button class="btn-outline-orange2" @click="delCalon()">Iya</button>
                            </div>
                        </Popup2>
                    </tr>
                </tbody>
            </table>

            <h6 class="bold mt-4 p-0">Calon DPR RI</h6>
            <table class="table mt-3" id="calonDpr">
                <thead>
                    <tr>
                    <th scope="col">Nomor Urut</th>
                    <th scope="col">Nama Admin</th>
                    <th scope="col">Nama Calon DPR RI</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Partai</th>
                    <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dpr in dprri" :key="dpr.id_calon">
                        <td>{{dpr.no_urut}}</td>
                        <td>{{dpr.admin}}</td>
                        <td>{{dpr.nama}}</td>
                        <td><img :src="dpr.foto" alt="" style="width:70px; height: 70px"></td>
                        <td>
                            <span v-for="par in dpr.partai" :key="par.id_partai" class="d-flex"> {{par.nama_partai}}</span>
                        </td>
                        <td>                                        
                            <span class="card-text icons me-2" @click="editCalon(dpr)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                            <span class="card-text icons" @click="toggleDelCalon(dpr.id_calon)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </td>
                        <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                            <div class="d-flex justify-content-end">
                                <button class="bg-light-orange2 me-2 br-10" @click="toggleDelCalon(dpr.id_calon)">Tidak</button>
                                <button class="btn-outline-orange2" @click="delCalon()">Iya</button>
                            </div>
                        </Popup2>
                    </tr>
                </tbody>
            </table>  

            <h6 class="bold mt-4 p-0">Calon DPD RI</h6>
            <table class="table mt-3" id="calonDpd">
                <thead>
                    <tr>
                    <th scope="col">Nomor Urut</th>
                    <th scope="col">Nama Admin</th>
                    <th scope="col">Nama Calon DPD RI</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Partai</th>
                    <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dpd in dpdri" :key="dpd.id_calon">
                        <td>{{dpd.no_urut}}</td>
                        <td>{{dpd.admin}}</td>
                        <td>{{dpd.nama}}</td>
                        <td><img :src="dpd.foto" alt="" style="width:70px; height: 70px"></td>
                        <td>
                            <span v-for="par in dpd.partai" :key="par.id_partai" class="d-flex"> {{par.nama_partai}}</span>
                        </td>
                        <td>                                        
                            <span class="card-text icons me-2" @click="editCalon(dpd)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                            <span class="card-text icons" @click="toggleDelCalon(dpd.id_calon)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </td>
                        <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                            <div class="d-flex justify-content-end">
                                <button class="bg-light-orange2 me-2 br-10" @click="toggleDelCalon(dpd.id_calon)">Tidak</button>
                                <button class="btn-outline-orange2" @click="delCalon()">Iya</button>
                            </div>
                        </Popup2>
                    </tr>
                </tbody>
            </table>       

            <h6 class="bold mt-4 p-0">Calon DPRD Provinsi</h6>
            <table class="table mt-3" id="calonDpd">
                <thead>
                    <tr>
                    <th scope="col">Nomor Urut</th>
                    <th scope="col">Nama Admin</th>
                    <th scope="col">Nama Calon DPRD Provinsi </th>
                    <th scope="col">Foto</th>
                    <th scope="col">Partai</th>
                    <th scope="col">Provinsi</th>
                    <th scope="col">Daerah Pilih <br>(Kota)</th>
                    <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dprdp in dprdprov" :key="dprdp.id_calon">
                        <td>{{dprdp.no_urut}}</td>
                        <td>{{dprdp.admin}}</td>
                        <td>{{dprdp.nama}}</td>
                        <td><img :src="dprdp.foto" alt="" style="width:70px; height: 70px"></td>
                        <td>
                            <span v-for="par in dprdp.partai" :key="par.id_partai" class="d-flex"> {{par.nama_partai}}</span>
                        </td>
                        <td>{{dprdp.provinsi}}</td>
                        <td>
                            <span v-for="dapil in dprdp.kota" :key="dapil.id_kota" class="d-flex"> {{dapil.kota}}</span>
                        </td>

                        <td>                                        
                            <span class="card-text icons me-2" @click="editCalon(dprdp)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                            <span class="card-text icons" @click="toggleDelCalon(dprdp.id_calon)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </td>
                        <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                            <div class="d-flex justify-content-end">
                                <button class="bg-light-orange2 me-2 br-10" @click="toggleDelCalon(dprdp.id_calon)">Tidak</button>
                                <button class="btn-outline-orange2" @click="delCalon()">Iya</button>
                            </div>
                        </Popup2>
                    </tr>
                </tbody>
            </table>  

            <h6 class="bold mt-4 p-0">Calon DPRD Kabupaten/Kota</h6>
            <table class="table mt-3" id="calonDpd">
                <thead>
                    <tr>
                    <th scope="col">Nomor Urut</th>
                    <th scope="col">Nama Admin</th>
                    <th scope="col">Nama Calon DPRD Kabupaten/Kota </th>
                    <th scope="col">Foto</th>
                    <th scope="col">Partai</th>
                    <th scope="col">Kota</th>
                    <th scope="col">Daerah Pilih <br>(Kecamatan)</th>
                    <th scope="col">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dprdk in dprdkab" :key="dprdk.id_calon">
                        <td>{{dprdk.no_urut}}</td>
                        <td>{{dprdk.admin}}</td>
                        <td>{{dprdk.nama}}</td>
                        <td><img :src="dprdk.foto" alt="" style="width:70px; height: 70px"></td>
                        <td>
                            <span v-for="par in dprdk.partai" :key="par.id_partai" class="d-flex"> {{par.nama_partai}}</span>
                        </td>
                        <td>{{dprdk.kota_calon}}</td>
                        <td>
                            <span v-for="dapil in dprdk.kecamatan" :key="dapil.id_kecamatan" class="d-flex"> {{dapil.kecamatan}}</span>
                        </td>

                        <td>                                        
                            <span class="card-text icons me-2" @click="editCalon(dprdk)"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></span>
                            <span class="card-text icons" @click="toggleDelCalon(dprdk.id_calon)"><font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </td>
                        <Popup2 v-if="popupDel" title="Apakah Anda yakin?" pesanPopup="Provinsi yang akan dihapus tidak dapat dikembalikan"> 
                            <div class="d-flex justify-content-end">
                                <button class="bg-light-orange2 me-2 br-10" @click="toggleDelCalon(dprdk.id_calon)">Tidak</button>
                                <button class="btn-outline-orange2" @click="delCalon()">Iya</button>
                            </div>
                        </Popup2>
                    </tr>
                </tbody>
            </table>                 

            <Popup v-if="calonUpdate" title="Edit Calon" @toggle-modal="toggleModal" style="overflow-y:scroll; padding-top:70px">
                <form @submit.prevent="updateCalonn" class="mt-4"> 
                    <div class="d-flex flex-row">
                        <h6 class="me-3">Admin calon : </h6>
                        <div class="dropdown mb-4">
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Ubah Admin
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="admin in admins" :key="admin.username" @click="updateCalon.id_admin = admin.id_admin; namaAdmin = admin.username" v-show="!admin.chosen && admin.role !== 'super'"><button class="dropdown-item" type="button">{{admin.username}}</button></li>
                            </ul>
                            <span>{{namaAdmin}}</span>
                        </div> 
                    </div>             

                    <div class="dropdown mb-4">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih jabatan : </h6>
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih Jabatan
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="jab in jabatan" :key="jab.jabatan" @click="updateCalon.id_jabatan = jab.id_jabatan; namaJabatan = jab.jabatan_tujuan"><button class="dropdown-item" type="button">{{jab.jabatan_tujuan}}</button></li>
                            </ul>
                            <span> {{namaJabatan}}</span>
                        </div>
                    </div>
                    <div class="forms-inputs mb-4">  
                        <span>Nomor Urut</span> 
                        <input id="no_urut_up" autocomplete="off" type="text" v-model="updateCalon.no_urut" v-bind:class="{'form-control':true, 'is-invalid' : !validNomor2(updateCalon.no_urut) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nomor urut disini">
                        <div class="invalid-feedback">Nomor urut tidak boleh kosong</div>
                    </div>
                    <div class="forms-inputs mb-3">  
                        <span>Nama Calon</span> 
                        <input id="namaUp" autocomplete="off" type="text" v-model="updateCalon.nama" v-bind:class="{'form-control':true, 'is-invalid' : !validasiNama2(updateCalon.nama) && isiBlured}" v-on:blur="isiBlured = true" @keydown.enter.prevent placeholder="Ketik nama calon disini">
                        <div class="invalid-feedback">Nama calon tidak boleh kosong</div>
                    </div>
                    <div class="d-flex flex-column mb-4">
                        <div>
                            <input type="file" id="inputFotoUp" style="display:none" ref="fotoCalonUp" @change="selectImageUp()"/>
                            <button class="btn bg-light-orange br-10" @click="addFotoUp()">Pilih foto</button>
                            <span class="ms-2" v-if="updateCalon.foto">{{updateCalon.foto.name}}</span>
                            <span class="ms-2" v-if="errorImg" style="color:red">- {{message}}</span>
                        </div>
                        <div v-if="updateCalon.fotoUpdate" class="mt-3 d-flex flex-wrap">
                            <div class="fotoBorder d-flex flex-row">
                                <img :src="urlFotoUp" alt="preview foto" style="width:250px; height:250px">
                                <span @click="updateCalon.fotoUpdate=''; errorImg = false"><font-awesome-icon icon="fa-solid fa-xmark" class="ms-2"/></span>
                            </div>
                        </div>
                    </div>
                    <div class="dropdown mb-4">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih partai : </h6>
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Pilih Partai
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="par in partai" :key="par.id_partai" @click="updateCalon.id_partai = par.id_partai; namaPartai = par.nama_partai"><button class="dropdown-item" type="button">{{par.nama_partai}}</button></li>
                            </ul>
                            <div v-if="!namaPartai">
                                <span v-for="par in namaParUp" :key="par.nama_partai" class="d-flex">{{par.nama_partai}}</span>
                            </div>
                            <span v-else>{{namaPartai}}</span>
                        </div>
                    </div>
                    <div class="dropdown mb-4" v-if="kotaUp">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih daerah : </h6>
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Daerah Pilih
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->                    
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="kot in kota" :key="kot.kota" @click="updateCalon.id_kota = kot.id_kota; updateCalon.id_kecamatan = null; namaDapil = kot.kota"><button class="dropdown-item" type="button">{{kot.kota}}</button></li>
                            </ul>
                            <div v-if="!namaDapil">
                                <span v-for="dap in namaDapilUp" :key="dap.kota" class="d-flex">{{dap.kota}}</span>
                            </div>
                            <span>{{namaDapil}}</span>
                        </div>
                    </div>
                    <div class="dropdown mb-4" v-if="kecUp">
                        <div class="d-flex flex-row">
                            <h6 class="me-3">Pilih daerah : </h6>
                            <button class="btn btn-secondary dropdown-toggle me-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                Daerah Pilih
                            </button>
                            <!-- <span v-show="!kotaBlured && !messageErr.length" style="color:red">{{messageErr}} sd</span> -->                 
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                <li v-for="kec in kecamatan" :key="kec.id_kecamatan" @click="updateCalon.id_kecamatan = kec.id_kecamatan; updateCalon.id_kota = null; namaDapil = kec.kecamatan"><button class="dropdown-item" type="button">{{kec.kecamatan}}</button></li>
                            </ul>
                            <div v-if="!namaDapil">
                                <span v-for="dap in namaDapilUp" :key="dap.kecamatan" class="d-flex">{{dap.kecamatan}}</span>
                            </div>
                            <span>{{namaDapil}}</span>
                        </div>
                    </div>

                    <div class="mb-3 d-flex justify-content-end"> 
                        <button type="submit" class="btn bg-light-orange br-10">Unggah</button>
                    </div>
                </form>
            </Popup>

            <Alert v-if="updated" :variantName="variant" :messageProps="pesanUpdate"/>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import Popup from './Popup.vue'
import Popup2 from './Berhasil.vue'
import Alert from './Pop_sukses.vue'

export default {
    name:'dapil_com',
    components: {
        Popup,
        Popup2,
        Alert
    },
    data: function () {
        return {
            presiden: [],
            dpdri: [],
            dprri: [],
            dprdprov: [],
            dprdkab:[],
            calon:{
                id_admin: '',
                id_jabatan: '',
                no_urut: '',
                nama: '',
                foto:''
            },
            addPartaii:{
                id_partai: '',
            },
            dapil:{
                id_kota: null,
                id_kecamatan: null
            },
            urlFoto: '',
            updateCalon: {
                id_calon: '',
                id_admin:'',
                id_jabatan: '',
                id_partai: '',
                no_urut: '',
                nama: '',
                fotoUpdate: '',
                foto: '',
                id_foto:'',
                id_kota: '',
                id_kecamatan: ''
            },
            admins: [],
            jabatan: [],
            partai:[],
            kota: [],
            kecamatan: [],
            isiBlured: false,
            variant:'',
            updated: false,
            pesanUpdate: '',
            popupDel: false,
            valid: false,
            validUpdate: false,
            messageErr: '',
            cekAdmin: false,
            namaAdmin: '',
            namaJabatan:'',
            namaPartai: '',
            namaDapil:'',
            idNewCal:'',
            id_calon:'',
            resultJabatan:'',
            calonUpdate: false,
            namaParUp: [],
            namaDapilUp: [],
            kotaUp: false,
            kecUp: false
        }
    },
    created(){
        window.onresize = () => {
            this.deviceWidth = window.innerWidth
        }
        this.loadPresiden()
        this.loadDpr()
        this.loadDpd()
        this.loadDprdProv()
        this.loadDprdKab()
        this.loadAdmin()
        this.loadJabatan()
        this.loadPartai()
        this.loadKota()
        this.loadKecamatan()
    },
    mounted(){
        this.edit
    },
    computed:{
        // idCal:function (){
        //     return localStorage.getItem('id_cal')
        // },
        idKec:function (){
            const kec = this.kecamatan
            let idyes = ''
            for(var i = 0; i < kec.length; i++){
                idyes = this.kecamatan[i].id_kecamatan
            }
            return idyes
        },
        filterKota:function(){
            return this.kota.filter((kta)=>{
                return kta.provinsi.match(this.curProv)
            })
        },
        cekDrop: function(){
            let cek = false
            if(this.calon.id_admin != '' && this.calon.id_jabatan != ''){
                cek = true
            }
            return cek
        },
        cekDropUp: function(){
            let cek = false
            if(this.updateCalon.id_kota){
                if(this.updateCalon.id_admin != '' && this.updateCalon.id_jabatan != '' && this.updateCalon.id_partai != '' && this.updateCalon.id_kota != ''){
                    cek = true
                }
            }
            else if(this.updateCalon.id_kecamatan){
                if(this.updateCalon.id_admin != '' && this.updateCalon.id_jabatan != '' && this.updateCalon.id_partai != '' && this.updateCalon.id_kecamatan != ''){
                    cek = true
                }
            }
            else{
                if(this.updateCalon.id_admin != '' && this.updateCalon.id_jabatan != '' && this.updateCalon.id_partai != ''){
                    cek = true
                }
            }

            return cek
        },
        cekDet:function(){
            let cek = false
            if(this.calon.id_partai != '' && this.calon.dapil != ''){
                cek = true
            }
            return cek
        },
        cekProv: function(){
            const jab = this.resultJabatan
            let cek = false
            if(jab === '3d9f2951-b519-4284-8e52-a10995536410'){
                cek =  true
            }
            return cek
        },
        cekKab: function(){
            const jab = this.resultJabatan
            let cek = false
            if(jab === '50e62ddc-3229-4f3e-a922-a68061c0bb1d'){
                cek = true
            }
            return cek
        }
        
    },
    destroyed(){
        localStorage.removeItem('id_cal')
    },
    methods:{
        loadPresiden(){
            const PRES_API_URL = `${process.env.VUE_APP_API_URL}/calon/jabatan/1470e05d-6f8d-476f-9d42-09ef4a23e5cc`
            try {
                axios.get(PRES_API_URL)
                .then(result => {
                    this.presiden = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        loadDpr(){
            const DPR_API_URL = `${process.env.VUE_APP_API_URL}/calon/jabatan/524bcc45-92d1-487d-b3da-d51b2ac770dd`
            try {
                axios.get(DPR_API_URL)
                .then(result => {
                    this.dprri = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        loadDpd(){
            const DPD_API_URL = `${process.env.VUE_APP_API_URL}/calon/jabatan/7a9b46a5-efe7-4f9b-80e7-4b54636810ad`
            try {
                axios.get(DPD_API_URL)
                .then(result => {
                    this.dpdri = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        }, 
        loadDprdProv(){
            const DPRDP_API_URL = `${process.env.VUE_APP_API_URL}/calon/prov/3d9f2951-b519-4284-8e52-a10995536410`
            try {
                axios.get(DPRDP_API_URL)
                .then(result => {
                    this.dprdprov = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },   
        loadDprdKab(){
            const DPRDK_API_URL = `${process.env.VUE_APP_API_URL}/calon/kab/50e62ddc-3229-4f3e-a922-a68061c0bb1d`
            try {
                axios.get(DPRDK_API_URL)
                .then(result => {
                    this.dprdkab = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },   
        loadAdmin(){
            const ADMIN_API_URL = `${process.env.VUE_APP_API_URL}/auth/admins`
            try {
                axios.get(ADMIN_API_URL)
                .then(result => {
                    this.admins = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                    this.checkAdmin()
                })
            } catch(err){
                console.log(err)
            }
        },      
        checkAdmin(){
            const admin = this.admins
            for(var i=0; i < admin.length; i++){
                if(this.admins[i].calon != ''){
                    this.admins[i].chosen = true
                }
            }
        },

        loadJabatan(){
            const JABATAN_API_URL = `${process.env.VUE_APP_API_URL}/jabatan`
            try {
                axios.get(JABATAN_API_URL)
                .then(result => {
                    this.jabatan = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        loadPartai(){
            const JABATAN_API_URL = `${process.env.VUE_APP_API_URL}/partai`
            try {
                axios.get(JABATAN_API_URL)
                .then(result => {
                    this.partai = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },

        loadKota(){
            const KOTA_API_URL = `${process.env.VUE_APP_API_URL}/dapil/kota`
            try {
                axios.get(KOTA_API_URL)
                .then(result => {
                    this.kota = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        loadKecamatan(){
            const KECAMATAN_API_URL = `${process.env.VUE_APP_API_URL}/dapil/kecamatan`
            try {
                axios.get(KECAMATAN_API_URL)
                .then(result => {
                    this.kecamatan = result.data
                    var parsedobj = JSON.parse(JSON.stringify(result))
                    console.log(parsedobj)
                })
            } catch(err){
                console.log(err)
            }
        },
        toggleModal(){
            this.calonUpdate = !this.calonUpdate;  
        },
        validate : function(){
            this.isiBlured = true;
            if(this.validNomor(this.calon.no_urut) && this.validasiNama(this.calon.nama) && this.calon.foto != '' && this.cekDrop){
                this.valid = true;
            }
        },
        validNomor : function(no) {
            if(no.length > 0){
                return true;
            }
        },
        validasiNama: function(uname){
            if(uname.length > 0){
                return true;
            }
        },
        validateUpdate : function(){
            this.isiBlured = true;
            if(this.validNomor2(this.updateCalon.no_urut) && this.validasiNama2(this.updateCalon.nama) && this.cekDropUp){
                this.validUpdate = true;
            }
        },
        validNomor2 : function(no) {
            if(no.length > 0){
                return true;
            }
        },
        validasiNama2: function(uname){
            if(uname.length > 0){
                return true;
            }
        },

        addPartai: function(){
            const PARTAI_API = `${process.env.VUE_APP_API_URL}/partai/calon`
            // e.preventDefault()
            if(this.addPartaii.id_partai != ''){
                try{
                    axios.post(PARTAI_API, {
                        id_calon: this.idNewCal,
                        id_partai: this.addPartaii.id_partai
                    })
                    .then(()=>{
                        this.addPartaii.id_partai = ''
                        this.namaPartai = ''
                    })
                } catch(err){
                    console.log(err)
                }
            }
        },

        addDapil: function(){
            const DAPIL_API = `${process.env.VUE_APP_API_URL}/dapil/addKota`
            // e.preventDefault()
            if(this.dapil.id_kota != null || this.dapil.id_kecamatan !== null){
                try{
                    axios.post(DAPIL_API, {
                        id_calon: this.idNewCal,
                        id_kota: this.dapil.id_kota,
                        id_kecamatan: this.dapil.id_kecamatan
                    })
                    .then(()=>{
                        this.dapil.id_kota = ''
                        this.dapil.id_kecamatan = ''
                        this.namaDapil = ''
                    })
                } catch(err){
                    console.log(err)
                }
            }
        },

        validateImage:function(file){
            const MAX_SIZE = 200000;
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

            if(file.size > MAX_SIZE){
                this.message = `File terlalu besar. Besar file maksimal ${MAX_SIZE / 1000}Kb`;
            }
            if(!allowedTypes.includes(file.type)){
                this.message = "Hanya boleh memilih gambar";
            }

            return this.message;
        },

        addFoto(){
            document.getElementById('inputFoto').click();
            this.errorImg = false
            this.message = ''
            this.messageImg = ''
        },

        selectImage(){
            this.calon.foto = this.$refs.fotoCalon.files[0]
            this.urlFoto = URL.createObjectURL(this.calon.foto)
            this.validateImage(this.calon.foto)

            if(this.message !== ''){
                this.errorImg = true
                // this.form.foto = ''
                   console.log(this.message)
            }
        }, 

        async addCalon(e){
            const POSTS_API_URL = `${process.env.VUE_APP_API_URL}/calon/`
            e.preventDefault()
            this.validate()
            if(this.valid){

                const formData = new FormData();

                formData.append('id_admin', this.calon.id_admin);
                formData.append('id_jabatan', this.calon.id_jabatan);
                formData.append('nama', this.calon.nama);
                formData.append('no_urut', this.calon.no_urut);
                formData.append('imgCalon', this.calon.foto);

                try {
                    await axios.post(POSTS_API_URL, formData)
                    .then((result) =>{
                        var parsedobj = JSON.parse(JSON.stringify(result.data))
                        console.log(parsedobj)
                        this.idNewCal = result.data[0].id_calon
                        this.resultJabatan = result.data[0].id_jabatan
                    })
                    this.updated = true
                    this.variant = 'success'
                    this.pesanUpdate = 'Calon berhasil ditambahkan'
                    this.isiBlured = false
                    this.valid = false
                    this.calon.id_admin =''
                    this.calon.id_jabatan = ''
                    this.calon.nama = ''
                    this.calon.no_urut = ''
                    this.calon.foto = ''
                    this.namaAdmin = ''
                }catch(err){
                    console.log(err)
                }
            }
        },

        addDetail(){
            if(this.cekProv || this.cekKab){
                Promise.all([this.addPartai(), this.addDapil()])
                .then(() => {
                    this.$router.go()
                    // localStorage.removeItem('id_cal')
                    this.idNewCal = ''
                    this.namaJabatan = ''
                    this.updated = true
                    this.variant = 'success'
                    this.pesanUpdate = 'Detail calon berhasil ditambahkan'
                })
            } else{
                const PARTAI_API = `${process.env.VUE_APP_API_URL}/partai/calon`
                // e.preventDefault()
                if(this.calon.id_partai != ''){
                    try{
                        axios.post(PARTAI_API, {
                            id_calon: this.idNewCal,
                            id_partai: this.addPartaii.id_partai
                        })
                        .then(()=>{
                            this.$router.go()
                            this.idNewCal = ''
                            this.namaJabatan = ''
                            this.updated = true
                            this.variant = 'success'
                            this.pesanUpdate = 'Detail calon berhasil ditambahkan' 
                            this.addPartaii.id_partai = ''
                            this.namaPartai = ''
                        })
                    } catch(err){
                        console.log(err)
                    }
                }
            }
        },       

        toggleDelCalon(id){
            this.id_calon = id;
            this.popupDel = !this.popupDel;
            this.updated = false
            this.pesanUpdate = ''
            this.variant = ''
        },

        delCalon(){
            const id_calon = this.id_calon;
            axios.delete(`${process.env.VUE_APP_API_URL}/calon/`+ id_calon).then(() =>{
                this.popupDel = false
                this.loadPresiden()
                this.loadDpr()
                this.loadDpd()
                this.loadDprdProv()
                this.loadDprdKab()
                this.updated = true
                this.pesanUpdate = 'Jabatan berhasil dihapus'
                this.variant = 'success'
            })            
        },

        editCalon(calon){
            this.pesanUpdate = ''
            this.updated = false
            this.variant = ''
            this.calonUpdate = true
            this.updateCalon.id_calon = calon.id_calon
            this.updateCalon.id_admin = calon.id_admin
            this.updateCalon.id_jabatan = calon.id_jabatan
            this.updateCalon.no_urut = calon.no_urut
            this.updateCalon.nama = calon.nama
            this.updateCalon.foto = calon.foto
            this.updateCalon.id_foto = calon.id_foto
            this.updateCalon.id_partai = calon.id_partai 
            this.namaAdmin = calon.admin
            this.namaJabatan = calon.jabatan_tujuan
            this.namaParUp = calon.partai
            // const lenKota = calon.kota
            // const lenKec = calon.kecamatan
            if(calon.kota != undefined){
                const kota = calon.kota
                this.kotaUp = true
                this.kecUp = false
                this.updateCalon.id_kota = kota.id_kota
                this.namaDapilUp = calon.kota
            }    
            else{
                const kecamatan = calon.kecamatan
                this.kecUp = true
                this.kotaUp = false
                this.updateCalon.id_kecamatan = kecamatan.id_kecamatan
                this.namaDapilUp = calon.kecamatan
            }
        },

        addFotoUp(){
            document.getElementById('inputFotoUp').click();
            this.errorImg = false
            this.message = ''
            this.messageImg = ''
        },

        selectImageUp(){
            this.updateCalon.fotoUpdate = this.$refs.fotoCalonUp.files[0]
            this.urlFotoUp = URL.createObjectURL(this.updateCalon.fotoUpdate)
            this.validateImage(this.updateCalon.fotoUpdate)

            if(this.message !== ''){
                this.errorImg = true
                // this.form.foto = ''
                   console.log(this.message)
            }
        }, 

        updateCalonn(e){
            e.preventDefault()
            this.validateUpdate()
            if(this.validUpdate){
                const id_calon = this.updateCalon.id_calon
                const imgCalon = this.updateCalon.fotoUpdate
                const foto = this.updateFoto.foto

                const formData = new FormData();

                formData.append('id_admin', this.updateFoto.id_admin);
                formData.append('id_jabatan', this.updateFoto.id_jabatan);
                formData.append('nama', this.updateFoto.nama);
                formData.append('no_urut', this.updateFoto.no_urut);
                
                if(imgCalon == ''){
                    if(foto != null) {
                        formData.append('foto', this.updateFoto.foto);
                        formData.append('id_foto', this.updateFoto.id_foto);
                    }
                    else{
                        formData.append('foto', null);
                        formData.append('id_foto', null);
                    }
                }
                else{
                    formData.append('imgCalon', this.updateCalon.fotoUpdate);
                }

                try {
                    return axios.put(`${process.env.VUE_APP_API_URL}/calon/` + id_calon, formData)
                    .then(() =>{
                        this.file = ''
                        this.updateFoto = ''
                        this.updateIdFoto = ''
                        this.updated = true
                        this.pesanUpdate = 'Foto berhasil diubah'
                        this.variant = 'success'
                    })
                } catch(err){
                    console.log(err)
                    this.updated = false
                    this.pesanUpdate = 'Foto gagal diubah'
                    this.variant = 'danger'
                    this.message = err.response.data

                    // this.error = true;
                }
            }
        },

    }
}
</script>

<style scoped>
.fotoBorder{
    border: 1px solid #282626;
    border-radius: 15px;
    padding: 1%;
}
h4,p,a{
    color: black;
}
p{
    color: black;
    font-size: 20px;
}
.col-md{
    color: black;
    display: flex;
    justify-content: center;
    padding: 3rem;
}
.br-15{
    border: 2px solid #DDA18C;
}
.forms-inputs {
    color: black;
    position: relative
}
.forms-inputs span {
    position: absolute;
    top: -18px;
    left: 10px;
    background-color: #fff;
    padding: 5px 10px;
    z-index: 10;
}
.forms-inputs input {
    height: 50px;
    border: 2px solid #9D9493;
    border-radius:10px;
}
.forms-inputs input:focus,.showPass:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #D65A40;
}
.btn {
    height: 40px;
}
.success-data {
    display: flex;
    flex-direction: column;
}
.bxs-badge-check {
    font-size: 90px
}
.showPass{
    height: 50px;
    background: none;
    border: 2px solid #9D9493;
    border-left: 0px;
    border-radius:10px;
}
.btn-outline-orange2{
    color:#DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C ;
    min-width: 4rem;
    background: white;
}
.bg-light-orange2:hover,.btn-outline-orange2:hover{
    color:white;
    background-color: #D65A40;
    border-color: #D65A40;
}
.bg-light-orange2{
    color: white;
     background-color: #DDA18C;
    font-weight:400;
    border: 1px solid #DDA18C;
    min-width: 4rem;
}
</style>