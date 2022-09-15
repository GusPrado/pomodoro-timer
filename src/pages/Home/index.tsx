import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles';

const newCycleValidationForm = zod.object({
  task: zod.string().min(1, 'Enter a task name'),
  minutesAmount: zod
    .number()
    .min(5, 'Task cycle min interval is 05 minutes')
    .max(60, 'Task cycle max interval is 60 minutes'),
});

type NewCycleFormData = zod.infer<typeof newCycleValidationForm>;

export function Home() {
  const { register, handleSubmit, watch, formState } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleValidationForm),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    });

  function handleCreateNewCycle(data: any) {
    console.log(data);
  }

  console.log('Validation error: ', formState.errors);

  const task = watch('task');
  const minutesAmount = watch('minutesAmount');
  const isSubmitDisabled = !task || !minutesAmount;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action=''>
        <FormContainer>
          <label htmlFor='task'>I will work at</label>
          <TaskInput
            id='task'
            list='task-suggestions'
            placeholder='Give a name for your project'
            {...register('task')}
          />

          <datalist id='task-suggestions'>
            <option value='Project 1' />
            <option value='Project 2' />
            <option value='Project 3' />
            <option value='Project 4' />
          </datalist>

          <label htmlFor='minutesAmount'>during</label>
          <MinutesAmountInput
            type='number'
            id='minutesAmount'
            placeholder='00'
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type='submit'>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
