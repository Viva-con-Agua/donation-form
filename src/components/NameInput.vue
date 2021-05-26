<template>
    <div class="supporter">
        <div class="field">
            <input
                v-model="value.email"
                type="email"
                name="email"
                placeholder="Email"
                v-validate="'required|email'"
                />
        </div>
        <div class="fields">
            <div class="first">
                <input
                    v-model="value.first_name"
                    type="text"
                    name="first"
                    placeholder="First Name"
                    v-validate="'required'"
                    />
            </div>

            <div class="last">
                <input
                    v-model="value.last_name"
                    type="text"
                    name="last"
                    placeholder="Last Name"
                    v-validate="'required'"
                    />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NameInput',
    props: ['value']
}
</script>
