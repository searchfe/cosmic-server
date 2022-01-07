import { InputType, Field, ID } from "@nestjs/graphql";


@InputType()
export class CreatStrokeDTO {
    // dashPattern: ReadonlyArray<number>;
    /**
     * 绘制对象，后续需要实现为对象
     */
    paint: string[];
    weight: number;
}

@InputType()
export class QueryStrokeDTO {
    @Field({ nullable: true })
    id?: string;

    @Field(() => ID, { nullable: true })
    team?: string;
}
