import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import {prisma} from '@/libs/prisma'
interface Params{
    params: {id: string};
} 
export async function GET(_request: Request, {params}: Params){
    try {
        const note  = await prisma.note.findFirst({
            where: 
            {
                id: Number(params.id)
            },
        })
        if (!note) return NextResponse.json({message: 'Note not found'}, {status: 404});
        return NextResponse.json(note);
    } catch (error) {
            if (error instanceof Error){
                return NextResponse.json(
                    {
                        message: error.message,
                    },
                    {
                        status:500,
                    }
                )
            }
    }
} 
export async function DELETE(_request: Request, {params}: Params){
    try {
        const deletedNote  = await prisma.note.delete({
            where: 
            {
                id: Number(params.id)
            },
        })
        if (!deletedNote) return NextResponse.json({message: 'Note not found'}, {status: 404});
        return NextResponse.json(deletedNote);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError){
            if (error.code === 'P2025'){
                return NextResponse.json(
                    {
                        message: "note not found",
                    },
                    {
                        status: 404,
                    }
                )
            }
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status:500,
                }
            )
        }   
    }
   
}
export function PUT(request: Request){
    return NextResponse.json({
        message: 'updating single note...'
    });  
}
