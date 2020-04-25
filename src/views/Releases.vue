<template>
    <div class="bg-lightgrey">
        <div class="container">
            <div class="row">
                <div class="col">
                    <p>All Releases</p>
                    {{releases}}
                    <div v-for="release in releases" :key="release.Id">
                        <p>{{release.artist}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            releases: []
        }
    },
    beforeMount: function() {
        fetch("https://localhost:5001/api/release")
        .then(res => res.json())
        .then(res => this.releases = res)
        .catch(err => console.log(err))
    }
}
</script>