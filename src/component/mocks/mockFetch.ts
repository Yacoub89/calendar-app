const BirthNamesList = {
    births: [
        { text: "yacoub" },
        { text: "Mark" }
    ]

}

export default async function mockFetch() {
    return {
        ok: true,
        status: 200,
        json: async () => Promise.resolve({ BirthNamesList }),
    };



}