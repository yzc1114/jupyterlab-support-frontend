import axios from 'axios'

export async function testAxios() {
    return await axios.get("http://someip:someport");
}