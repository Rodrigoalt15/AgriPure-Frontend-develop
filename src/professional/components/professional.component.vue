<template>
    <div class="professional-view">
        <table class="profile-table">
            <thead>
            <tr>
                <th>...</th>
                <th>....</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="profile-cell" v-for="profile in leftProfiles" :key="profile.id">
                    <div class="profile-card">
                        <img :src="profile.photo" :alt="profile.name" class="profile-photo">
                        <h2>{{ profile.name }}</h2>
                        <!-- Otros detalles del perfil -->
                    </div>
                </td>
            </tr>
            <tr>
                <td class="profile-cell" v-for="profile in rightProfiles" :key="profile.id">
                    <div class="profile-card">
                        <img :src="profile.photo" :alt="profile.name" class="profile-photo">
                        <h2>{{ profile.name }}</h2>
                        <!-- Otros detalles del perfil -->
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'ProfileComponent',
    // Agrega tus datos de perfil aquí
    data() {
        return {
            profiles: [
                // Perfil 1
                {
                    id: 1,
                    name: 'John Doe',
                    photo: 'https://larepublica.cronosmedia.glr.pe/migration/images/M7YCS7VAPBBTFFUEBTA3UKGEKE.jpg',
                    // Otros datos del perfil
                },
                // Perfil 2
                {
                    id: 2,
                    name: 'Will Smith',
                    photo: 'https://news.agrofystatic.com/ingeniero-agronomo-200747.png?d=620x375',
                    // Otros datos del perfil
                },
                // Perfil 3
                {
                    id: 3,
                    name: 'Alex Johnson',
                    photo: 'https://cdn-610f9e01c1ac181114e17676.closte.com/wp-content/uploads/2022/09/cuanto-gana-un-ingeniero-agronomo-3-1024x682.jpg',
                    // Otros datos del perfil
                },
                // Perfil 4
                {
                    id: 4,
                    name: 'Jhon Thompson',
                    photo: 'https://s.yimg.com/ny/api/res/1.2/JtThykfgS8I5gQaSCzsOgw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/es/lanacion.com.ar/490983b4ab8b0edcb313a93a9412b7e3',
                    // Otros datos del perfil
                },
                // Perfil 5
                {
                    id: 5,
                    name: 'Michael Davis',
                    photo: 'https://media.istockphoto.com/id/1160974381/es/foto/el-huerto-agricultor-revisando-plantas-en-el-huerto-y-haciendo-unas-notas-concepto-agr%C3%ADcola.jpg?s=612x612&w=0&k=20&c=39erDge3UVnPe6mkcRaRTL6okXTWi-gh2FiHAXplkEk=',
                    // Otros datos del perfil
                },
                // Perfil 6
                {
                    id: 6,
                    name: 'Emily Wilson',
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkPcCr2tVtKz5gpnMcqUvMauwzzfqW4u7-w-_8X8EzF-hZPM780npBLO6zZBV-Ke8k5c&usqp=CAU',
                    // Otros datos del perfil
                }
            ]
        };
    },
    computed: {
        leftProfiles() {
            return this.profiles.slice(0, 3);
        },
        rightProfiles() {
            return this.profiles.slice(3, 6);
        }
    }
};
</script>
<style scoped>

.professional-view {
    padding: 20px 0;
    max-width: 70%;
    border-radius: 20px;
    background-color: #242424;
}

.profile-table {
    width: 100%;
}

.profile-cell {
    padding: 10px;
}


.profile-card {
    width: 300px;
    margin: 10px;
    padding: 10px;
    background-color: green; /* Establece el fondo verde para las tarjetas */
    border-radius: 4px;
    text-align: center;
}
.profile-card img {
    width: 100px;
    height: 100px;

}

h2 {
    margin-top: 10px;
    color: white; /* Establece el color del texto en las tarjetas a blanco */
}

.contact-button {
    margin-top: 10px;
    background-color: orange; /* Establece el color de fondo del botón a anaranjado */
    color: white; /* Establece el color del texto del botón a blanco */
    border: none; /* Elimina el borde del botón */
    padding: 8px 12px; /* Ajusta el relleno del botón según sea necesario */
    border-radius: 4px; /* Establece el radio de borde del botón */
}
</style>