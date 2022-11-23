import { Entity, Reduces } from '@boostercloud/framework-core'
import { TestEvent } from '../events/test'
import { UUID } from '@boostercloud/framework-types'

@Entity
export class TestEntity {
  public constructor(readonly id: UUID, readonly name: string, readonly array: Array<string>) {}

  @Reduces(TestEvent)
  public static reduceSomeEvent(event: TestEvent, currentEntityState?: TestEntity): TestEntity {
    return {
      id: event.id,
      name: event.name,
      array: event.array,
    } as TestEntity
  }
}
