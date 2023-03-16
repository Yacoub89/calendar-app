const BirthNamesList = {
    births: [
        { text: "yacoub" },
        { text: "Mark" }
    ]
}

const mockFetch = async () => (
    Promise.resolve({
        ok: true,
        status: 200,
        json: async () => BirthNamesList,
    })
)

export default mockFetch;
