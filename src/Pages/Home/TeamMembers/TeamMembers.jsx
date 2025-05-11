import teamMembers from "../../../../public/teamMembers.json"

const TeamMembers = () => {
    return (
        <div>
            <section className="py-8 mb-8 md:mb-16 lg:mb-20">
                <div className="max-w-6xl mx-auto text-center">
                    <h4 className="text-gray-500 uppercase tracking-widest text-sm">Who We Are</h4>
                    <h2 className="text-3xl md:text-4xl font-semibold text-center text-primary mb-2">Top Real Estate Agency in Nesttree</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8 max-w-6xl mx-auto px-4">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gray-50 shadow rounded-lg p-4 text-center">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-56 h-64 mx-auto rounded object-cover"
                            />
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-gray-600 text-sm">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TeamMembers;