import { Register, UUID } from '@boostercloud/framework-types'
import { TestEvent } from '../events/test'

export class Test {
  public constructor(readonly id: UUID, readonly name: string) {}

  public static async handle(command: Test, register: Register): Promise<void> {
    register.events(new TestEvent(UUID.generate(), 'guapisimo', ['que nice', 'tio']))
  }
}
