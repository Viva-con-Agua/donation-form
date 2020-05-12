<template>
    <div id=address-form>
        <el-form>
            <el-form-item
                prop="street">
                <el-input
                    placeholder="Straße, Hausnummer"
                    v-model="address.street"
                    >
                </el-input>
            </el-form-item>
            <el-row>
                <el-col :span="6">
                    <el-form-item
                        prop="zip">
                        <el-input

                            placeholder="PLZ"
                            v-model="address.zip"
                            >
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item
                        prop="city">
                        <el-input

                            placeholder="Stadt"
                            v-model="address.city"
                            >
                        </el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-form-item
                prop="country">
                <el-input

                    placeholder="Land"
                    v-model="address.country"
                    >
                </el-input>
            </el-form-item>

        </el-form>
    </div>
</template>
<script>
export default {
    name: 'AddressForm',
    data() {
        return {
            address: {
                street:'',
                zip: '',
                city: '',
                country: ''
            }
        }
    }
}
</script>
