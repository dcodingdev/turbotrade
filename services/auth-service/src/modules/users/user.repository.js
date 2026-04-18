import { User } from './user.model.js';
export const UserRepository = {
    async create(data) {
        // Ensure email is lowercase before saving
        return User.create({
            ...data,
            email: data.email.toLowerCase()
        });
    },
    async findByEmail(email) {
        // Explicitly select password because it is hidden in the schema
        return User.findOne({ email: email.toLowerCase() }).select('+password');
    },
    async findById(id) {
        return User.findById(id);
    },
    async exists(email) {
        const count = await User.countDocuments({ email: email.toLowerCase() });
        return count > 0;
    }
};
//# sourceMappingURL=user.repository.js.map