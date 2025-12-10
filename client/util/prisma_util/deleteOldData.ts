import { prisma } from '@/lib/prisma';

const { dogePricesArchive } = prisma;

export const deleteOldData = async () => {
    try {
        // Calculate the cutoff date for deletion (24 hours ago)
        const deletionCutoff = new Date();
        deletionCutoff.setHours(deletionCutoff.getHours() - 24);
    
        const deletedData = await dogePricesArchive.deleteMany({
            where: {
                createdAt: {
                    lt: deletionCutoff
                },
            },
        });

        console.log(`Deleted ${deletedData?.count || 0} old records from dogePricesArchive.`)
        return deletedData

    } catch(error) {
        console.log('Error deleting old data:', error)
    } finally {
        await prisma.$disconnect()
    }



}
