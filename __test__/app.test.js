const getDataFromApi = require('../src/client/js/app');
const axios = require('axios');

jest.mock('axios');

it('returns the title of the first album', async () => {
    axios.get.mockResolvedValue({
        data: [{
            userId: 1,
            id: 1,
            title: 'My First Album'
        }, ]
    });

    const title = await getDataFromApi();
    expect(title).toEqual('My First Album');
});