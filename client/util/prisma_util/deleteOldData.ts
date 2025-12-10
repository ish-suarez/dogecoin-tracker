import { prisma } from '@/lib/prisma';

const { dogePricesArchive, softDeletePrices } = prisma;

export const deleteOldData = async () => {
    try {
        const deletionCutoff = new Date();
        deletionCutoff.setDate(deletionCutoff.getDate() - 3);

        const oldData = await dogePricesArchive.findMany({
            where: {
                createdAt: {
                    lt: deletionCutoff
                }
            }
        })

        await softDeletePrices.createMany({data: oldData})
    
        const deletedData = await dogePricesArchive.deleteMany({
            where: {
                createdAt: {
                    lt: deletionCutoff
                },
            },
        });

        console.log(`Deleted ${deletedData.count} old records from dogePricesArchive.`)
        return deletedData


    } catch(error) {
        console.log('Error deleting old data:', error)
    } finally {
        await prisma.$disconnect()
    }



}
